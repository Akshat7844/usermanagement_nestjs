import { Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { AddProductDto } from 'src/dto/add-product.dto';
import { CreateOrderDto } from 'src/dto/create-order.dto';
import { OrderPaginationDto } from 'src/dto/pagination.dto';

import { OrdersRepository } from 'src/repository/orders.repository';

export class CreateOrderWithProductsDto {
    @Type(() => CreateOrderDto)
    order: CreateOrderDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddProductDto)
    products: AddProductDto[];
}
@Injectable()
export class OrdersService {
    constructor(private ordersRepository: OrdersRepository) {}

    async createOrder(
        createOrder: CreateOrderDto,
        addProduct: AddProductDto[],
    ) {
        console.log('=============service', { createOrder });
        try {
            return this.ordersRepository.createOrderWithProducts(
                createOrder,
                addProduct,
            );
        } catch (err) {
            console.log({ err });
        }
    }

    async createorder(createDto: CreateOrderDto) {
        return this.ordersRepository.createorder(createDto);
    }

    async getAllOrders(dto: OrderPaginationDto) {
        const { page, limit } = dto;
        const offset = (page - 1) * limit;
        return this.ordersRepository.getAllOrders(offset, limit);
    }

    async getOrderById(id: number) {
        try {
            return this.ordersRepository.getOrderById(id);
        } catch (err) {
            console.log({ err });
            throw err;
        }
    }
    async deleteOrder(id: number) {
        return this.ordersRepository.deleteOrder(id);
    }
}
