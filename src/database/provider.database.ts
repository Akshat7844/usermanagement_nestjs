import { Sequelize } from 'sequelize-typescript';
import { OrderEntity } from 'src/entity/order.entity';
import { Product } from 'src/entity/product.entity';
import { User } from 'src/entity/user.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'Aksh7782',
                database: 'usermanagement',
            });
            sequelize.addModels([User, OrderEntity, Product]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
