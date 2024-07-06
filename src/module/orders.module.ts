import { Module } from '@nestjs/common';

import { OrdersController } from 'src/controller/orders.controller';
import { DatabaseModule } from 'src/database/module.database';
import { OrdersRepository } from 'src/repository/orders.repository';
import { OrdersService } from 'src/service/orders.service';

@Module({
    imports: [DatabaseModule],
    controllers: [OrdersController],
    providers: [OrdersService, OrdersRepository],
    exports: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
