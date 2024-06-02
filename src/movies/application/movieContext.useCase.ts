import { SharedTypes } from '../../config/constants';
import { MovieRepository } from '../domain/movie.repository';
import { StarWarsRepository } from '../infraestructure/repository/gateway/swapi.repository';
import { Inject, Injectable } from '@nestjs/common';
import { StarWarsStrategy } from './strategies/starWars.strategy';

export interface MovieStrategy {
  update(): void;
}

export class DefaultStrategy implements MovieStrategy {
  update() {}
}

// if you want to update another saga with a different structure, you can add a new strategy
@Injectable()
export class MovieContext {
  private movieStrategy: MovieStrategy;

  constructor(
    @Inject(SharedTypes.SWAPI_REPO)
    private readonly starWarsRepo: StarWarsRepository,
    @Inject(SharedTypes.MOVIE_REPO) private readonly movieRepo: MovieRepository,
  ) {}

  setMovieStrategy(context: string) {
    this.movieStrategy = this.factoryRepo(context);
  }

  async updateMovieRepo() {
    if (!this.movieStrategy) {
      throw new Error(
        'Movie strategy is not set. Call setMovieStrategy() first.',
      );
    }
    await this.movieStrategy.update();
  }

  private factoryRepo(context: string): MovieStrategy {
    switch (context.toUpperCase()) {
      case 'STAR_WARS':
        return new StarWarsStrategy(this.starWarsRepo, this.movieRepo);
      default:
        return new DefaultStrategy();
    }
  }
}
