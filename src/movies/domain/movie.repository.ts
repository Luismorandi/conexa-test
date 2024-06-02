import { MovieEntity } from './movie.entity';

export interface MovieRepository {
  findAllByZaga(movie: string): Promise<MovieEntity[]>;
  findLastCreateByZaga(movie: string, origin: string): Promise<MovieEntity>;
  createMovies(movies: MovieEntity[]): Promise<MovieEntity[]>;
  findAll(): Promise<MovieEntity[]>;
  findById(id: string): Promise<MovieEntity>;
  updateMovie(movie: MovieEntity, id: string): Promise<MovieEntity>;
  deleteMovie(id: string): Promise<MovieEntity>;
}
