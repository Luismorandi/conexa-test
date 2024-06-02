import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../../../auth/application/guards/auth.guard';
import { PublicAccess } from '../../../auth/application/decorators/public.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MovieUseCase } from '../../../movies/application/movie.useCase';
import { Roles } from '../../../auth/application/decorators/roles.decortor';
import { RolesGuard } from '../../../auth/application/guards/roles.guard';
import {
  CreateMovieDTO,
  UpdateMovieDTO,
} from '../../../movies/application/dto/movies.dto';
import { ROLES } from '../../../config/constants';

@Controller('movies')
@UseGuards(AuthGuard, RolesGuard)
export class MovieController {
  constructor(private readonly movieService: MovieUseCase) {}

  @ApiOperation({ summary: 'Find all movies by zaga' })
  @ApiResponse({
    status: 201,
    description: 'Get all movies by zaga',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @PublicAccess()
  @Get('zaga/:movie')
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

  @ApiOperation({ summary: 'Find all movies' })
  @ApiResponse({
    status: 201,
    description: 'Get all movies',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @PublicAccess()
  @Get('/')
  async findAlla() {
    try {
      return await this.movieService.findAll();
    } catch (err) {
      throw new HttpException(
        `error find all movies  : ${err}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Find spcecific movie' })
  @ApiResponse({
    status: 201,
    description: 'Find spcecific movie',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Roles(ROLES.BASIC)
  @Get('/:id')
  async findById(@Param('id') id: string) {
    try {
      return await this.movieService.findById(id);
    } catch (err) {
      throw new HttpException(
        `error find specific movie: ${err}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Create movies' })
  @ApiResponse({
    status: 201,
    description: 'Create many movies',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Roles(ROLES.ADMIN)
  @Post('create')
  async create(@Body() body: CreateMovieDTO) {
    try {
      return await this.movieService.createManyMovies(body);
    } catch (err) {
      throw new HttpException(
        `error create movies by zaga : ${err}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Update movie' })
  @ApiResponse({
    status: 201,
    description: 'Update movie',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Roles(ROLES.ADMIN)
  @Put('update')
  async update(@Body() body: UpdateMovieDTO) {
    try {
      return await this.movieService.updateMovie(body);
    } catch (err) {
      throw new HttpException(
        `error update movie : ${err}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Delete movie' })
  @ApiResponse({
    status: 201,
    description: 'Delete movie',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Roles(ROLES.ADMIN)
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    try {
      return await this.movieService.deleteMovie(id);
    } catch (err) {
      throw new HttpException(
        `error delete movie : ${err}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
