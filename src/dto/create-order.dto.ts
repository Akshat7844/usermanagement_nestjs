// orders/dto/create-order.dto.ts
import {
    IsString,
    IsEnum,
    IsDateString,
    IsOptional,
    IsNotEmpty,
    IsInt,
} from 'class-validator';

export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
}

export class CreateOrderDto {
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @IsDateString()
    @IsOptional()
    orderDate?: Date;

    @IsString()
    @IsOptional()
    shippingAddress?: string;

    @IsEnum(OrderStatus)
    status: OrderStatus;
}
