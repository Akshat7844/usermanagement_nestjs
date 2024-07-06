// product/product.model.ts
import {
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { OrderEntity } from './order.entity';

@Table({
    tableName: 'Product',
    timestamps: true,
})
export class Product extends Model<Product> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    id: number;

    @ForeignKey(() => OrderEntity)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    orderId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    description: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    price: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    category: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    stock: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    brand: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    supplier: string;

    @BelongsTo(() => OrderEntity)
    order: OrderEntity;
}
