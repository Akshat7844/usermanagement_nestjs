import { IsString, IsNotEmpty, IsNumber, Min, IsInt } from 'class-validator';

export class AddProductDto {
    @IsNotEmpty()
    @IsInt()
    orderId: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsNumber()
    @Min(0)
    stock: number;

    @IsString()
    brand: string;

    @IsString()
    supplier: string;
}
