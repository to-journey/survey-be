import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import typeorm from '../db/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserAttributionsModule } from './user-attributions/user-attributions.module';
import { SurveyModule } from './survey/survey.module';
import { SeedModule } from './seed/seed.module';
import { SettingModule } from './setting/setting.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm') as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    UserAttributionsModule,
    AuthModule,
    SurveyModule,
    SeedModule,
    SettingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}