import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Query,
    ParseIntPipe,
} from '@nestjs/common';
import { CreateOrderDto } from 'src/dto/create-order.dto';

import { OrderPaginationDto } from 'src/dto/pagination.dto';
import {
    CreateOrderWithProductsDto,
    OrdersService,
} from 'src/service/orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Post('transaction')
    createOrderWithTransaction(
        @Body()
        createOrder: CreateOrderWithProductsDto,
    ) {
        console.log('=======controlller', { createOrder });
        return this.ordersService.createOrder(
            createOrder.order,
            createOrder.products,
        );
    }

    @Post()
    createOrder(@Body() createOrder: CreateOrderDto) {
        return this.ordersService.createorder(createOrder);
    }

    @Get()
    async getAllOrders(@Query() paginationDto: OrderPaginationDto) {
        try {
            return await this.ordersService.getAllOrders(paginationDto);
        } catch (err) {
            console.log(err);
        }
    }

    // @Put(':id')
    // update(@Param('id') id: number, @Body() updateOrder: UpdateOrderDto) {
    //     return this.ordersService.updateOrder(id, updateOrder);
    // }

    @Get(':id')
    async getOrder(@Param('id', ParseIntPipe) id: number) {
        return await this.ordersService.getOrderById(id);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.ordersService.deleteOrder(id);
    }
}
