import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/user/enums/role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async seed() {
    const user = await this.userRepository.findOne({
      where: { email: 'admin@test.com' },
    });

    if (!user) {
      const user = this.userRepository.create({
        email: 'admin@test.com',
        password: await hash('pass123456', 10),
        firstName: '管理者',
        lastName: '管理者',
        role: Role.ADMIN,
      });
      await this.userRepository.save(user);
    }
  }
}
