import { Module } from '@nestjs/common';
import { SettingModule } from 'src/setting/setting.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, SettingModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
