import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Survey } from './entities/survey.entity';
import { Problem } from './entities/problem.entity';

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

  findAll() {
    return this.surveyRepository.find();
  }

  findOne(id: number) {
    return this.surveyRepository.findOne({
      where: { id },
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
