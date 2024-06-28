import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from './entity/user.entity';
import { Order } from 'sequelize';
import { Op } from 'sequelize';

@Injectable()
export class UserRepository {
  constructor() {}

  async getAllUsers(
    search: string,
    limit: number,
    offset: number,
    order: Order,
  ): Promise<User[]> {
    return await User.findAll({
      where: {
        // role: 'Admin',
        [Op.or]: [
          {
            fullname: {
              [Op.iLike]: `%${search || ''}%`,
            },
          },
          {
            address: {
              [Op.iLike]: `%${search || ''}%`,
            },
          },
          {
            role: {
              [Op.iLike]: `%${search || ''}%`,
            },
          },
        ],
      },
      offset,
      limit,
      order,
    });
  }
  async createUser(createUserDto: CreateUserDto) {
    return await User.create(createUserDto);
  }

  async updateUser(username: string, updatedValue: any): Promise<void> {
    await User.update(updatedValue, { where: { username } });
  }

  async getUser(username: string): Promise<User | null> {
    const user = await User.findOne({ where: { username } });
    return user;
  }

  async deleteUser(username: string) {
    return await User.destroy({ where: { username } });
  }
  async updatePassword(newpasswor: string, username: string) {
    return await User.update({ password: newpasswor }, { where: { username } });
  }
}
