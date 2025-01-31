import { Module } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController]
})
export class UserModule {}