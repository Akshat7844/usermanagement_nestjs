import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
    PrimaryKey,
    AutoIncrement,
} from 'sequelize-typescript';
import { role } from 'src/roles.enum';
import { OrderEntity } from './order.entity';

@Table({
    tableName: 'Users',
    timestamps: true,
})
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    fullname: string;

    @Column({
        unique: true,
        type: DataType.STRING,
        allowNull: false,
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    age: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    phoneNo: number;

    @Column({
        unique: true,
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.ENUM,
        values: Object.values(role),
        allowNull: false,
    })
    role: role;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    salary: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address: string;

    @HasMany(() => OrderEntity)
    orders: OrderEntity[];
}
