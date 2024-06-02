import { MovieEntity } from './movie.entity';

export interface MovieRepository {
  findAllBysaga(movie: string): Promise<MovieEntity[]>;
  findLastCreateBysaga(movie: string, origin: string): Promise<MovieEntity>;
  createMovies(movies: MovieEntity[]): Promise<MovieEntity[]>;
  findAll(): Promise<MovieEntity[]>;
  findById(id: string): Promise<MovieEntity>;
  updateMovie(movie: MovieEntity, id: string): Promise<MovieEntity>;
  deleteMovie(id: string): Promise<MovieEntity>;
}
