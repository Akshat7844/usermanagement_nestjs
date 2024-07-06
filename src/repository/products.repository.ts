import { Injectable } from '@nestjs/common';
import { Op, Order } from 'sequelize';
import { AddProductDto } from 'src/dto/add-product.dto';
import { UpdateProductDto } from 'src/dto/update.dto';
import { Product } from 'src/entity/product.entity';

@Injectable()
export class ProductsRepository {
    constructor() {}

    async AddProduct(product: AddProductDto) {
        return Product.create(product);
    }

    async getAllProducts(
        offset: number,
        limit: number,
        search: string,
        order: Order,
    ) {
        return await Product.findAndCountAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.iLike]: `%${search || ''}%`,
                        },
                    },
                    {
                        brand: {
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
    async getProductById(id: number) {
        return Product.findOne({ where: { id } });
    }

    async updateProduct(
        id: number,
        updatedValue: UpdateProductDto,
    ): Promise<void> {
        await Product.update(updatedValue, { where: { id } });
    }

    async deleteProduct(id: number) {
        return Product.destroy({ where: { id } });
    }
}
