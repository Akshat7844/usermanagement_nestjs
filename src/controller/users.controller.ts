import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    Query,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { PaginationDto } from '../dto/pagination.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(
        @Body()
        createUserDto: CreateUserDto,
    ): Promise<User> {
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    async getAllUsers(@Query() paginationDto: PaginationDto) {
        try {
            const users = await this.usersService.getAllUsers(paginationDto);
            return users;
        } catch (err) {
            console.log(err);
        }
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateUser: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUser);
    }

    @Get(':id')
    async getUser(@Param() id: number): Promise<User> {
        return await this.usersService.searchById(id);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.usersService.deleteUser(id);
    }

    @Put(':username/change-password')
    async changePassword(
        @Param('id') id: number,
        @Body() changePassDto: ChangePasswordDto,
    ) {
        await this.usersService.changePassword(id, changePassDto);
        return { message: ' Password Changed successfully.' };
    }
}
