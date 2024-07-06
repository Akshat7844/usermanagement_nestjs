import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from '../entity/user.entity';
import { Order } from 'sequelize';
import { Op } from 'sequelize';
import { OrderEntity } from 'src/entity/order.entity';
import { Product } from 'src/entity/product.entity';

@Injectable()
export class UserRepository {
    constructor() {}

    async getAllUsers(
        search: string,
        limit: number,
        offset: number,
        order: Order,
    ) {
        return await User.findAll({
            include: [
                {
                    model: OrderEntity,
                    as: 'orders',
                    include: [
                        {
                            model: Product,
                            as: 'products',
                        },
                    ],
                    attributes: [
                        'id',
                        'orderDate',
                        'shippingAddress',
                        'status',
                    ],
                },
            ],
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

    async updateUser(id: number, updatedValue: any): Promise<void> {
        await User.update(updatedValue, { where: { id } });
    }

    async getUser(id: number): Promise<User | null> {
        const user = await User.findOne({ where: { id } });
        return user;
    }

    async deleteUser(id: number) {
        return await User.destroy({ where: { id } });
    }
    async updatePassword(newpasswor: string, id: number) {
        return await User.update({ password: newpasswor }, { where: { id } });
    }
}
