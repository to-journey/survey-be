import { Problem } from 'src/survey/entities/problem.entity';
import { Survey } from 'src/survey/entities/survey.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('answer')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Survey)
  survey: Survey;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Problem)
  problem: Problem;

  @Column()
  answer: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
