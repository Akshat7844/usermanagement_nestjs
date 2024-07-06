// orders/orders.model.ts
import {
    Table,
    Column,
    Model,
    DataType,
    BelongsTo,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    HasMany,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { Product } from './product.entity';

@Table({
    tableName: 'Order',
    timestamps: true,
})
export class OrderEntity extends Model<OrderEntity> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    orderDate: Date;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    shippingAddress: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    status: string;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Product)
    products: Product[];
}
