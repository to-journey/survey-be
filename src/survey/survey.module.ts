import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { Problem } from './entities/problem.entity';
import { UserModule } from 'src/user/user.module';
import { Answer } from './entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Survey, Problem, Answer]), UserModule],
  controllers: [SurveyController],
  providers: [SurveyService],
})
export class SurveyModule {}
