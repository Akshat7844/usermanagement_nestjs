import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/module.database';

@Module({
  imports: [UsersModule, DatabaseModule, AuthModule],
})
export class AppModule {}
