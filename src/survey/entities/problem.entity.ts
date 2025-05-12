import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProblemType } from '../enums/problem-type.enum';
import { Survey } from './survey.entity';

@Entity('problems')
export class Problem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;
  
  @Column()
  name: string;

  @Column()
  type: ProblemType;

  @Column({ type: 'simple-array' })
  options: string[];

  @ManyToOne(() => Survey, (survey) => survey.problems)
  survey: Survey;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
