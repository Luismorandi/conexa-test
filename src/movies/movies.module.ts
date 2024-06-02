import { Module } from '@nestjs/common';
import { PrismaModule } from '../config/db/prisma/prisma.module';
import { MovieController } from './infraestructure/controllers/movie.controller';
import { MovieUseCase } from './application/movie.useCase';
import { UsersModule } from '../users/users.module';
import { MovieRepoProvider } from './infraestructure/repository/movie.repository.provider';
import { StarWarsProvider } from './infraestructure/repository/gateway/swapi.repository.provider';
import { MovieContext } from './application/movieContext.useCase';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [MovieController],
  providers: [MovieUseCase, MovieRepoProvider, StarWarsProvider, MovieContext],
})
export class MoviesModule {}
