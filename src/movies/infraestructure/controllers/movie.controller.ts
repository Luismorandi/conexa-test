import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/application/guards/auth.guard';
import { PublicAccess } from 'src/auth/application/decorators/public.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MovieUseCase } from 'src/movies/application/movie.useCase';

@Controller('movie')
@UseGuards(AuthGuard)
export class MovieController {
  constructor(private readonly movieService: MovieUseCase) {}

  @ApiOperation({ summary: 'Find all movies by zaga' })
  @ApiResponse({
    status: 201,
    description: 'Get all movies by zaga',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @PublicAccess()
  @Get(':movie')
  async findAllByZaga(@Param('movie') movie: string) {
    try {
      return await this.movieService.findAllByZaga(movie);
    } catch (err) {
      throw new HttpException(
        `error find all movies by zaga : ${err}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
