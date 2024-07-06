import { Type } from 'class-transformer';
import {
    IsOptional,
    IsNumber,
    Min,
    IsInt,
    IsString,
    IsIn,
    IsEnum,
} from 'class-validator';

export class PaginationDto {
    @IsOptional()
    @IsNumber()
    @Min(0)
    offset?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    limit?: number;

    @IsOptional()
    sortBy?: 'age' | 'fullName';

    @IsOptional()
    orderBy?: 'ASC' | 'DESC';

    @IsOptional()
    search?: string;
}

export class productPaginationDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(10)
    limit?: number = 10;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsIn(['name', 'price', 'category'])
    sortBy?: string;

    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    order?: string;
}

enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELED = 'CANCELED',
}

export class OrderPaginationDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;

    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;

    @IsOptional()
    @IsString()
    shippingAddress?: string;
}
