import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { SettingService } from 'src/setting/setting.service';
import { Role } from 'src/user/enums/role.enum';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private settingService: SettingService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.role !== Role.ADMIN) {
      const loginPayload = this.jwtService.verify(loginDto.token);
      if (loginPayload.type !== 'login-token') {
        throw new UnauthorizedException('Invalid token');
      }
    }

    if (user.lastLogin) {
      const lastLogin = new Date(user.lastLogin);
      const now = new Date();
      const diff = now.getTime() - lastLogin.getTime();
      const diffDays = diff / (1000 * 60 * 60 * 24);
      if (diffDays > 1) {
        const rewardPoints = await this.settingService.findOne('reward_points');
        await this.userService.update(user.id, {
          point: user.point + parseInt(rewardPoints.value),
          lastLogin: new Date(),
        });
      }
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    return { user, token };
  }

  async register(registerDto: RegisterDto) {
    registerDto.password = await hash(registerDto.password, 10);
    const user = await this.userService.create(registerDto);

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    return { user, token };
  }

  async profile(id: number) {
    return this.userService.findOne(id);
  }

  async loginToken() {
    const payload = {
      type: 'login-token',
    };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    return { token };
  }
}
