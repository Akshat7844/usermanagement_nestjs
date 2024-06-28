import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.searchById(username);
      const password = user.password;

      if (user && pass === password) {
        return user;
      }
      return null;
    } catch (err) {
      console.log({ err });
    }
  }

  async login(user: any) {
    const payload = { username: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: 'secret',
        expiresIn: '7h',
      }),
    };
  }

  async changePassword(username: string, newPassword: string): Promise<any> {
    const user = await this.usersService.searchById(username);
    // newPassword = bcrypt.hashSync(newPassword, 10);

    const update = await user.update(
      { password: newPassword },
      { where: { username } },
    );
    console.log({ update });
  }
}
