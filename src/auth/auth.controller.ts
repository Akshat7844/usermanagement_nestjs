import {
  Controller,
  Post,
  Body,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from 'src/users/dto/login-user.dto';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.usersService.searchById(loginDto.username);
    // console.log({ user });
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    if (!user.dataValues.username) {
      throw new UnauthorizedException('Invalid Credentials.');
    }
    const username = user.dataValues.username;
    const validUser = await this.authService.validateUser(
      username,
      loginDto.password,
    );
    if (!validUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(validUser);
  }

  // @Put('change-password')
  // async changePassword(
  //   @Body() body: { newPassword: string; username: string },
  // ) {
  //   await this.authService.changePassword(body.username, body.newPassword);
  //   return { message: 'Password changed successfully' };
  // }
}
