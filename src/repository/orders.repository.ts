import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { AddProductDto } from 'src/dto/add-product.dto';

import { CreateOrderDto } from 'src/dto/create-order.dto';
import { OrderEntity } from 'src/entity/order.entity';
import { Product } from 'src/entity/product.entity';

@Injectable()
export class OrdersRepository {
    constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

    async createOrderWithProducts(
        createOrderDto: CreateOrderDto,
        addProductDto: AddProductDto[],
    ) {
        const transaction = await this.sequelize.transaction();
        console.log('==========repo', { createOrderDto });
        try {
            // Create the order
            const order = await OrderEntity.create(
                // {
                //     userId: createOrderDto.userId,
                //     orderDate: createOrderDto.orderDate,
                //     shippingAddress: createOrderDto.shippingAddress,
                //     status: createOrderDto.status,
                // },
                createOrderDto,
                { transaction },
            );

            // Create the associated products
            const products = addProductDto.map((addProductDto) => ({
                ...addProductDto,
                orderId: order.id,
            }));

            await Product.bulkCreate(products, { transaction });

            // Commit the transaction
            await transaction.commit();

            return order;
        } catch (error) {
            // Rollback the transaction if any error occurs
            await transaction.rollback();
            throw new Error(`Transaction failed: ${error.message}`);
        }
    }

    async createorder(createDto: CreateOrderDto) {
        return OrderEntity.create(createDto);
    }

    async getAllOrders(offset: number, limit: number) {
        return await OrderEntity.findAndCountAll({
            include: [
                {
                    model: Product,
                    as: 'products',
                    attributes: ['name', 'description', 'price'],
                },
            ],
            offset,
            limit,
        });
    }
    async getOrderById(id: number) {
        return OrderEntity.findOne({ where: { id } });
    }

    async deleteOrder(id: number) {
        return OrderEntity.destroy({ where: { id } });
    }
}
