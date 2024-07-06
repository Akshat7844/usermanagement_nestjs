import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    Query,
    ParseIntPipe,
} from '@nestjs/common';
import { AddProductDto } from 'src/dto/add-product.dto';
import { productPaginationDto } from 'src/dto/pagination.dto';
import { UpdateProductDto } from 'src/dto/update.dto';
import { ProductsService } from 'src/service/products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    create(
        @Body()
        addProductDto: AddProductDto,
    ) {
        return this.productsService.addProduct(addProductDto);
    }

    @Get()
    async getAllProducts(@Query() paginationDto: productPaginationDto) {
        try {
            const users =
                await this.productsService.getAllProducts(paginationDto);
            return users;
        } catch (err) {
            console.log(err);
        }
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateProduct: UpdateProductDto,
    ) {
        return this.productsService.updateProduct(id, updateProduct);
    }

    @Get(':id')
    async getProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.productsService.getProductById(id);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.deleteProduct(id);
    }
}
