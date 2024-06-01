import { MovieEntity } from "./movie.entity";

export interface MovieRepository {
  createMovie(input: ): Promise<MovieEntity>;
  updateById(id: string): Promise<MovieEntity>;
  findById(id: string): Promise<MovieEntity>;
  deleteById(id: string): Promise<MovieEntity>;
  findAll(): Promise<MovieEntity[]>;
}
