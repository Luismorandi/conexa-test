import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { MovieEntity } from '../../../../movies/domain/movie.entity';
import { ResponseSwapi, SwapiMovie } from './dto';
import { MovieValue } from '../../../../movies/domain/movie.value';
import { ORGIGIN_SWAPI, STAR_WARS } from '../../../../config/constants';

@Injectable()
export class StarWarsRepository {
  private readonly logger = new Logger(StarWarsRepository.name);
  private readonly starWarsUrl = 'https://swapi.dev/api/films/';

  async getLastMoviesFrom(date: Date): Promise<MovieEntity[]> {
    try {
      const newDate = new Date(date);
      const response = await axios.get<ResponseSwapi>(this.starWarsUrl);
      const lastMovies = response.data.results.filter(
        (movie) => new Date(movie.created).getTime() >= newDate.getTime(),
      );

      return lastMovies.length > 0
        ? lastMovies.map((movie) => this.convertApiMovie(movie))
        : [];
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async getAllMovies(): Promise<MovieEntity[]> {
    try {
      const response = await axios.get<ResponseSwapi>(this.starWarsUrl);
      const results = response.data.results;

      return results.length > 0
        ? results.map((movie) => this.convertApiMovie(movie))
        : [];
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  private convertApiMovie(apiMovie: SwapiMovie): MovieEntity {
    const other_details = {};
    return new MovieValue({
      title: apiMovie.title,
      episode: apiMovie.episode_id,
      director: apiMovie.director,
      description: apiMovie.opening_crawl,
      producer: apiMovie.producer,
      releaseDate: apiMovie.release_date,
      otherDetails: other_details,
      origin: ORGIGIN_SWAPI,
      createdAt: apiMovie.created,
      updatedAt: apiMovie.edited,
      saga: STAR_WARS,
    });
  }
}
