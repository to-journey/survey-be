import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/user/enums/role.enum';
import { In, Repository } from 'typeorm';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Problem } from './entities/problem.entity';
import { Survey } from './entities/survey.entity';
import { Answer } from './entities/answer.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,

    @InjectRepository(Problem)
    private problemRepository: Repository<Problem>,

    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
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
      where:
        user.role == Role.ADMIN
          ? undefined
          : { participants: In([user.email]) },
    });
  }

  findOne(user: User, id: number) {
    return this.surveyRepository.findOne({
      where:
        user.role == Role.ADMIN
          ? { id }
          : { id, participants: In([user.email]) },
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

  async submitProblem(
    user: User,
    surveyId: number,
    problemId: number,
    answer: string,
  ) {
    const existingAnswer = await this.answerRepository.findOne({
      where: { survey: { id: surveyId }, problem: { id: problemId }, user: { id: user.id } },
    });
    if (existingAnswer) {
      return this.answerRepository.update(existingAnswer.id, { answer });
    }
    return this.answerRepository.save({
      survey: { id: surveyId },
      problem: { id: problemId },
      user: { id: user.id },
      answer,
    });
  }
}
