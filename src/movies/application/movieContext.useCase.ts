import { ORGIGIN_SWAPI, SharedTypes } from 'src/config/constants';
import { MovieRepository } from '../domain/movie.repository';
import { StarWarsRepository } from '../infraestructure/repository/gateway/swapi.repository';
import { MovieEntity } from '../domain/movie.entity';
import { Inject, Injectable } from '@nestjs/common';

interface MovieStrategy {
  update(): void;
}

class StarWarsStrategy implements MovieStrategy {
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
      await this.movieRepo.createMovies(updateMovies, STAR_WARS);
      return updateMovies;
    }

    const dateLastMovie = new Date(lastCretedMovie.createdAt);

    updateMovies = await this.starWarsRepo.getLastMoviesFrom(
      new Date(dateLastMovie),
    );
    await this.movieRepo.createMovies(updateMovies, STAR_WARS);
    return updateMovies;
  }
}

class DefaultStrategy implements MovieStrategy {
  update() {}
}

// if you want to update another saga with a different structure, you can add a new strategy
@Injectable()
export class MovieContext {
  private movieStrategy: MovieStrategy;
  @Inject(SharedTypes.SWAPI_REPO)
  private readonly starWarsRepo: StarWarsRepository;
  @Inject(SharedTypes.MOVIE_REPO) private readonly movieRepo: MovieRepository;

  setMovieStrategy(context: string) {
    this.movieStrategy = this.factoryRepo(context);
  }

  updateMovieRepo() {
    this.movieStrategy.update();
  }

  private factoryRepo(context: string): MovieStrategy {
    switch (context.toLowerCase()) {
      case 'star_wars':
        return new StarWarsStrategy(this.starWarsRepo, this.movieRepo);
      default:
        return new DefaultStrategy();
    }
  }
}
