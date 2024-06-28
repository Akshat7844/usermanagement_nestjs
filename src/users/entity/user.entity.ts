import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';
import { role } from 'src/roles.enum';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullname: string;

  @PrimaryKey
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
}
