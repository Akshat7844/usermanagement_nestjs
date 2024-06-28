import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../users/entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  async getAllUsers(@Query() paginationDto: PaginationDto) {
    try {
      const users = await this.usersService.getAllUsers(paginationDto);
      return users;
    } catch (err) {
      console.log(err);
    }
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUser: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUser);
  }

  @Get(':username')
  async getUser(@Param() username: { username: string }): Promise<User> {
    return await this.usersService.searchById(username.username);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Put(':username/change-password')
  async changePassword(
    @Param('username') username: string,
    @Body() changePassDto: ChangePasswordDto,
  ) {
    await this.usersService.changePassword(username, changePassDto);
    return { message: ' Password Changed successfully.' };
  }
}
