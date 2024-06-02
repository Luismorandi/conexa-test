import { Inject } from '@nestjs/common';
import { MovieStrategy } from '../movieContext.useCase';
import {
  ORGIGIN_SWAPI,
  STAR_WARS,
  SharedTypes,
} from '../../../config/constants';
import { MovieEntity } from '../../../movies/domain/movie.entity';
import { MovieRepository } from '../../../movies/domain/movie.repository';
import { StarWarsRepository } from '../../../movies/infraestructure/repository/gateway/swapi.repository';

export class StarWarsStrategy implements MovieStrategy {
  constructor(
    @Inject(SharedTypes.SWAPI_REPO)
    private readonly starWarsRepo: StarWarsRepository,
    @Inject(SharedTypes.MOVIE_REPO) private readonly movieRepo: MovieRepository,
  ) {
    this.starWarsRepo = this.starWarsRepo;
    this.movieRepo = this.movieRepo;
  }
  async update() {
    let updateMovies: MovieEntity[];
    const lastCretedMovie = await this.movieRepo.findLastCreateBysaga(
      STAR_WARS,
      ORGIGIN_SWAPI,
    );

    if (!lastCretedMovie) {
      updateMovies = await this.starWarsRepo.getAllMovies();
      updateMovies = await this.movieRepo.createMovies(updateMovies);
      return updateMovies;
    }

    const dateLastMovie = new Date(lastCretedMovie.createdAt);

    updateMovies = await this.starWarsRepo.getLastMoviesFrom(
      new Date(dateLastMovie),
    );
    await this.movieRepo.createMovies(updateMovies);
    return updateMovies;
  }
}
