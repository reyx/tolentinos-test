import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min } from 'class-validator';
import { BoxItemDTO } from './box-item.dto';

export class BoxDTO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @Min(1)
  @ApiProperty()
  size: number;

  @ApiProperty({ type: [BoxItemDTO] })
  items: BoxItemDTO[];
}
