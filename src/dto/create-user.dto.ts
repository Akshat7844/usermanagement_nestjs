import { IsString, IsInt, IsEmail, MinLength, IsEnum } from 'class-validator';
import { role } from 'src/roles.enum';

export class CreateUserDto {
    @IsString()
    fullname: string;

    @IsString()
    @MinLength(4)
    username: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsInt()
    age: number;

    @IsString()
    phoneNo: number;

    @IsEmail()
    email: string;

    @IsString()
    @IsEnum(role)
    role: role;

    @IsInt()
    salary: number;

    @IsString()
    address: string;
}
