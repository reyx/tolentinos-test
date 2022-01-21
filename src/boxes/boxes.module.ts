import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoxItem } from './box-item.entity';
import { BoxesService } from './boxes.service';
import { BoxesController } from './boxes.controller';
import { AuthModule } from 'src/auth/auth.module';
import { BoxHistory } from './box-history.entity';
import { BoxSubscriber } from './box.subscriber';
import { Box } from './box.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Box, BoxItem, BoxHistory]), AuthModule],
  providers: [BoxesService, BoxSubscriber],
  exports: [BoxesService],
  controllers: [BoxesController],
})
export class BoxModule {}
