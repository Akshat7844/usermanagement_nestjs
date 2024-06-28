import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UserRepository } from './users.repository';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Order } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser({
      fullname: createUserDto.fullname,
      username: createUserDto.username,
      password: createUserDto.password,
      age: createUserDto.age,
      phoneNo: createUserDto.phoneNo,
      email: createUserDto.email,
      role: createUserDto.role,
      salary: createUserDto.salary,
      address: createUserDto.address,
    });
  }

  async getAllUsers(paginationDto: PaginationDto): Promise<User[]> {
    const { offset, limit, sortBy, orderBy, search } = paginationDto;
    const order: Order = [[sortBy, orderBy]];

    return await this.userRepository.getAllUsers(search, limit, offset, order);
  }

  async updateUser(id: number, updateData: UpdateUserDto) {
    return await User.update(updateData, { where: { id } });
  }

  async searchById(username: string): Promise<User | null> {
    const user = await this.userRepository.getUser(username);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async deleteUser(username: string): Promise<void> {
    try {
      await this.userRepository.deleteUser(username);
      console.log('Users successfully deleted.');
    } catch (err) {
      console.log({ err });
    }
  }

  async changePassword(username: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.userRepository.getUser(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { oldPassword, newPassword } = changePasswordDto;

    const passwordMatch = oldPassword === user.password;
    if (!passwordMatch) {
      throw new BadRequestException('Old password is incorrect');
    }

    await this.userRepository.updatePassword(newPassword, username);
  }
}
