import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/UsersController';

@Module({
  controllers: [UsersController]
})
export class UsersModule { }
