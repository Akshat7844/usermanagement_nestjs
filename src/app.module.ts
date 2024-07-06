import { Module } from '@nestjs/common';
// import { AuthModule } from './auth/auth.module';
import { UsersModule } from './module/users.module';
import { DatabaseModule } from './database/module.database';
import { OrdersModule } from './module/orders.module';
import { ProductsModule } from './module/products.module';

@Module({
    imports: [
        UsersModule,
        DatabaseModule,
        // AuthModule,
        OrdersModule,
        ProductsModule,
    ],
})
export class AppModule {}
