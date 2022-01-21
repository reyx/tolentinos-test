import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BoxDTO } from './box.dto';
import { BoxesService } from './boxes.service';

@Controller('boxes')
@ApiTags('boxes')
@ApiBearerAuth()
export class BoxesController {
  constructor(private boxService: BoxesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() model: BoxDTO) {
    return this.boxService.create(model);
  }
}
