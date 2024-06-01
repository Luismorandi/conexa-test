import { MovieRepository } from '../domain/movie.repository';
import { MovieEntity } from '../domain/movie.entity';
import { MovieContext } from './movieContext.useCase';
import { Inject } from '@nestjs/common';
import { SharedTypes } from 'src/config/constants';

export class MovieUseCase {
  constructor(
    @Inject(SharedTypes.MOVIE_REPO)
    private readonly movieRepository: MovieRepository,
  ) {}

  public async findAllByZaga(movie: string): Promise<MovieEntity[]> {
    // const context = new MovieContext();
    // context.setMovieStrategy(movie);
    // context.updateMovieRepo();
    const movies = await this.movieRepository.findAllByZaga(movie);
    return movies;
  }
}
