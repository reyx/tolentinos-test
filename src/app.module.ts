import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BoxModule } from './boxes/boxes.module';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'tolentino',
      password: 'U@li2Mama',
      database: 'tolentino',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TerminusModule,
    HttpModule,
    AuthModule,
    BoxModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
