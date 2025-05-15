import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guard';
import { RequestWithUser } from 'src/types';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(RolesGuard)
  @Get('profile')
  profile(@Req() req: RequestWithUser) {
    return this.authService.profile(req.user.id);
  }

  @Get('login-token')
  loginToken() {
    return this.authService.loginToken();
  }
}
