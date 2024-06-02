import { MovieRepository } from '../domain/movie.repository';
import { MovieEntity } from '../domain/movie.entity';
import { MovieContext } from './movieContext.useCase';
import { Inject } from '@nestjs/common';
import { SharedTypes } from '../../config/constants';
import { CreateMovieDTO, UpdateMovieDTO } from './dto/movies.dto';

export class MovieUseCase {
  constructor(
    @Inject(SharedTypes.MOVIE_REPO)
    private readonly movieRepository: MovieRepository,
    private readonly movieContext: MovieContext,
  ) {}

  public async findAllBysaga(movie: string): Promise<MovieEntity[]> {
    this.movieContext.setMovieStrategy(movie);
    await this.movieContext.updateMovieRepo();
    const movies = await this.movieRepository.findAllBysaga(
      movie.toUpperCase(),
    );
    return movies;
  }

  public async findAll(): Promise<MovieEntity[]> {
    const movies = await this.movieRepository.findAll();
    return movies;
  }

  public async findById(id: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findById(id);
    return movie;
  }

  public async createManyMovies(input: CreateMovieDTO): Promise<MovieEntity[]> {
    const movies = await this.movieRepository.createMovies(input.movies);
    return movies;
  }

  public async updateMovie(input: UpdateMovieDTO): Promise<MovieEntity> {
    const movies = await this.movieRepository.updateMovie(input, input.id);
    return movies;
  }

  public async deleteMovie(id: string): Promise<MovieEntity> {
    const movies = await this.movieRepository.deleteMovie(id);
    return movies;
  }
}
