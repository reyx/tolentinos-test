import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { DeepPartial, getManager } from 'typeorm';
import { validate } from 'class-validator';
import { Box } from './box.entity';
import { BoxItem } from './box-item.entity';

@Injectable()
export class BoxesService {
  constructor() {}

  async create(model: DeepPartial<Box>): Promise<any> {
    const manager = await getManager();

    const box = await manager.transaction(async (transaction) => {
      const entity = Object.assign(new Box(), model);
      const errors = await validate(entity);
      if (errors.length) {
        throw new BadRequestException(`Validation failed!`);
      }

      const box = await transaction.save(entity);

      for (let item of model.items) {
        const boxItem = Object.assign(new BoxItem(), item);
        boxItem.box = box;
        await transaction.save(boxItem);
      }

      return box;
    });

    return box.id;
  }
}
