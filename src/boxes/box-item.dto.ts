import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min } from 'class-validator';

export class BoxItemDTO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @Min(1)
  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;
}
