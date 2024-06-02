import { Inject } from '@nestjs/common';
import { MovieStrategy } from '../movieContext.useCase';
import { ORGIGIN_SWAPI, SharedTypes } from 'src/config/constants';
import { MovieEntity } from 'src/movies/domain/movie.entity';
import { MovieRepository } from 'src/movies/domain/movie.repository';
import { StarWarsRepository } from 'src/movies/infraestructure/repository/gateway/swapi.repository';

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
    const STAR_WARS = 'star_wars';
    const lastCretedMovie = await this.movieRepo.findLastCreateByZaga(
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
