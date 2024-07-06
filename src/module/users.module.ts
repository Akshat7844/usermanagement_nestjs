import { Module } from '@nestjs/common';
import { UsersController } from '../controller/users.controller';
import { UsersService } from '../service/users.service';
import { UserRepository } from '../repository/users.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
