import { MovieRepository } from '../domain/movie.repository';
import { MovieEntity } from '../domain/movie.entity';
import { MovieContext } from './movieContext.useCase';
import { Inject } from '@nestjs/common';
import { SharedTypes } from 'src/config/constants';

export class MovieUseCase {
  constructor(
    @Inject(SharedTypes.MOVIE_REPO)
    private readonly movieRepository: MovieRepository,
    private readonly movieContext: MovieContext,
  ) {}

  public async findAllByZaga(movie: string): Promise<MovieEntity[]> {
    this.movieContext.setMovieStrategy(movie);
    await this.movieContext.updateMovieRepo();
    const movies = await this.movieRepository.findAllByZaga(
      movie.toLowerCase(),
    );
    return movies;
  }
}
