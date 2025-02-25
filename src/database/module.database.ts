import { Module } from '@nestjs/common';
import { databaseProviders } from './provider.database';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
