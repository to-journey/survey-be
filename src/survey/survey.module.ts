import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { Answer } from './entities/answer.entity';
import { Problem } from './entities/problem.entity';
import { Survey } from './entities/survey.entity';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Survey, Problem, Answer]),
    UserModule,
  ],
  controllers: [SurveyController],
  providers: [SurveyService],
})
export class SurveyModule {}
