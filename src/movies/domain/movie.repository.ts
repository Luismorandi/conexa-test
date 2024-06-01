import { MovieEntity } from './movie.entity';

export interface MovieRepository {
  findAllByZaga(movie: string): Promise<MovieEntity[]>;
  findLastCreateByZaga(movie: string, origin: string): Promise<MovieEntity>;
  createMovies(movies: MovieEntity[], zaga: string): Promise<MovieEntity[]>;
}
