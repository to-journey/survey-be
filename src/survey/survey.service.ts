import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { In, Repository } from 'typeorm';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Problem } from './entities/problem.entity';
import { Survey } from './entities/survey.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,

    @InjectRepository(Problem)
    private problemRepository: Repository<Problem>,
  ) {}

  async create(createSurveyDto: CreateSurveyDto) {
    const survey = this.surveyRepository.create(createSurveyDto);
    const problems = await Promise.all(
      createSurveyDto.problems.map(async (problem) => {
        return this.problemRepository.save({
          ...problem,
          survey: { id: survey.id },
        });
      }),
    );
    survey.problems = problems;
    return this.surveyRepository.save(survey);
  }

  findAll(user: User) {
    return this.surveyRepository.find({
      where: { participants: In([user.email]) },
    });
  }

  findOne(user: User, id: number) {
    return this.surveyRepository.findOne({
      where: { id, participants: In([user.email]) },
      relations: ['problems'],
    });
  }

  update(id: number, updateSurveyDto: UpdateSurveyDto) {
    return this.surveyRepository.update(id, updateSurveyDto);
  }

  async remove(id: number) {
    await this.problemRepository.delete({ survey: { id } });
    return this.surveyRepository.delete(id);
  }
}
