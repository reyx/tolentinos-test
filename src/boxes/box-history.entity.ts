import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Box } from './box.entity';

@Entity()
export class BoxHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Box)
  box: Box;

  @Column()
  action: string;

  @ManyToOne((type) => User)
  user: User;

  @CreateDateColumn()
  public createdAt: Date;
}
