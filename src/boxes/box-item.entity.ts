import { IsNotEmpty, Min } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Box } from './box.entity';

@Entity()
export class BoxItem {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @Min(1)
  @Column()
  quantity: number;

  @Column('decimal', { precision: 13, scale: 2 })
  price: number;

  @ManyToOne((type) => Box, (box) => box.items)
  box: Box;
}
