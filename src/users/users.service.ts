import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { hashSync, genSaltSync } from 'bcrypt-nodejs';
import { User } from './user.entity';
import { UserDTO } from './user.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const users = await this.userRepository.count();

    if (!users) {
      console.log('Admin user not found, creating...');

      await this.create(
        Object.assign(new UserDTO(), {
          email: 'admin@pudim.com.br',
          password: '@pudim',
          passwordConfirm: '@pudim',
          firstName: 'Admin',
          lastName: 'User',
        }),
      );
    }
  }

  findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  findOneWithPassword(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'firstName', 'lastName', 'password'],
    });
  }

  async create(model: DeepPartial<UserDTO>): Promise<any> {
    const entity = Object.assign(new User(), model);
    entity.salt = genSaltSync();

    if (model.password !== model.passwordConfirm)
      throw new BadRequestException('password mismatch');

    entity.password = hashSync(entity.password, entity.salt);
    const user = await this.userRepository.save(entity);

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  update(model: User): Promise<any> {
    return this.userRepository.update(model.id, {
      firstName: model.firstName,
      lastName: model.lastName,
      email: model.email,
    });
  }

  updatePassword(id: number, password: string) {
    const salt = genSaltSync();
    password = hashSync(password, salt);
    return this.userRepository.update(id, { password, salt });
  }
}
