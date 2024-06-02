import { Module } from '@nestjs/common';
import { UserUseCase } from './application/user.useCases';
import { UserController } from './infraestructure/controllers/create.controller';
import { PrismaModule } from '../config/db/prisma/prisma.module';
import { UserRepoProvider } from './infraestructure/repository/postgres/user.repository.provider';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserUseCase, UserRepoProvider],
  exports: [UserUseCase],
})
export class UsersModule {}
