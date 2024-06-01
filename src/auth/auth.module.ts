import { Module } from '@nestjs/common';
import { AuthUseCase } from './application/auth.useCase';
import { UserUseCase } from 'src/users/application/user.useCases';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './infraestructure/controllers/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthUseCase],
  imports: [UsersModule],
})
export class AuthModule {}
