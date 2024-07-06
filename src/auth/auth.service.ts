// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// // import * as bcrypt from 'bcrypt';
// import { UsersService } from '../service/users.service';

// @Injectable()
// export class AuthService {
//     constructor(
//         private usersService: UsersService,
//         private jwtService: JwtService,
//     ) {}

//     async validateUser(id: number, pass: string): Promise<any> {
//         try {
//             const user = await this.usersService.searchById(id);
//             const password = user.password;

//             if (user && pass === password) {
//                 return user;
//             }
//             return null;
//         } catch (err) {
//             console.log({ err });
//         }
//     }

//     async login(user: any) {
//         const payload = { username: user.username, role: user.role };
//         return {
//             access_token: this.jwtService.sign(payload, {
//                 secret: 'secret',
//                 expiresIn: '7h',
//             }),
//         };
//     }

//     async changePassword(id: number, newPassword: string): Promise<any> {
//         const user = await this.usersService.searchById(id);
//         // newPassword = bcrypt.hashSync(newPassword, 10);

//         const update = await user.update(
//             { password: newPassword },
//             { where: { id } },
//         );
//         console.log({ update });
//     }
// }
