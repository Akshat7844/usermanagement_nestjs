import { Injectable } from '@nestjs/common';
import { Order } from 'sequelize';
import { AddProductDto } from 'src/dto/add-product.dto';
import { productPaginationDto } from 'src/dto/pagination.dto';
import { UpdateProductDto } from 'src/dto/update.dto';
import { ProductsRepository } from 'src/repository/products.repository';

@Injectable()
export class ProductsService {
    constructor(private productsRepository: ProductsRepository) {}

    async addProduct(product: AddProductDto) {
        return this.productsRepository.AddProduct(product);
    }

    async getAllProducts(product: productPaginationDto) {
        const { page, limit, search, order, sortBy } = product;
        const orderBy: Order = [[sortBy, order]];
        const offset = (page - 1) * limit;
        return this.productsRepository.getAllProducts(
            offset,
            limit,
            search,
            orderBy,
        );
    }

    async getProductById(id: number) {
        return this.productsRepository.getProductById(id);
    }
    async deleteProduct(id: number) {
        return this.productsRepository.deleteProduct(id);
    }
    async updateProduct(id: number, updateDto: UpdateProductDto) {
        return this.productsRepository.updateProduct(id, updateDto);
    }
}
