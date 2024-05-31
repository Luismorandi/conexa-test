import { Module } from '@nestjs/common';
import { UserUseCase } from './application/user.useCases';
import { UserController } from './infraestructure/controllers/create.controller';
import { PrismaModule } from 'src/config/db/prisma/prisma.module';
import { UserPostgresRepository } from './infraestructure/repository/postgres/user.repository';
import { PrismaService } from 'src/config/db/prisma/services/prisma.service';
import { LocalRepository } from './infraestructure/repository/local.respository';
import { SharedTypes } from 'src/config/constants';
import { UserRepoProvider } from './infraestructure/repository/postgres/user.repository.provider';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserUseCase, UserRepoProvider],
  exports: [UserUseCase],
})
export class UsersModule {}
