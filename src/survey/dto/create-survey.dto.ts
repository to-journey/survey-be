import { Problem } from '../entities/problem.entity';

export class CreateSurveyDto {
  name: string;
  description: string;
  problems: Problem[];
}
