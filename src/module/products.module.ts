import { Module } from '@nestjs/common';
import { ProductsController } from 'src/controller/products.controller';
import { ProductsRepository } from 'src/repository/products.repository';
import { ProductsService } from 'src/service/products.service';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
