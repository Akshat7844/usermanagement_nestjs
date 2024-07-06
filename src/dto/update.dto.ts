import {
    IsString,
    IsInt,
    IsEmail,
    MinLength,
    IsOptional,
    IsNumber,
    Min,
} from 'class-validator';

export class UpdateUserDto {
    @IsString()
    fullname: string;

    @IsString()
    @MinLength(4)
    username: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    phoneNo: number;

    @IsEmail()
    email: string;

    @IsInt()
    salary: number;

    @IsString()
    address: string;
}

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    stock?: number;

    @IsOptional()
    @IsString()
    brand?: string;

    @IsOptional()
    @IsString()
    supplier?: string;
}

// enum OrderStatus {
//     PENDING = 'PENDING',
//     CONFIRMED = 'CONFIRMED',
//     SHIPPED = 'SHIPPED',
//     DELIVERED = 'DELIVERED',
//     CANCELED = 'CANCELED',
// }

// export class UpdateOrderDto {
//     @IsOptional()
//     @IsNumber()
//     userId?: number;

//     @IsOptional()
//     @IsNumber()
//     productId?: number;

//     @IsOptional()
//     @IsNumber()
//     quantity?: number;

//     @IsOptional()
//     @IsNumber()
//     total?: number;

//     @IsOptional()
//     @IsString()
//     @IsDateString()
//     orderDate?: Date;

//     @IsOptional()
//     @IsString()
//     shippingAddress?: string;

//     @IsOptional()
//     @IsEnum(OrderStatus)
//     status?: OrderStatus;
// }
