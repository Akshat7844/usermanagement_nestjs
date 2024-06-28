import { IsString, IsInt, IsEmail, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  fullname: string;

  @IsString()
  @MinLength(4)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  phoneNo: number;

  @IsEmail()
  email: string;

  @IsInt()
  salary: number;

  @IsString()
  address: string;
}
