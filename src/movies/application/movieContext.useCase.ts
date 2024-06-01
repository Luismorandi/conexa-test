class StarWarsStrategy {
  update() {}
}

interface MovieStrategy {
  update(): void;
}

class MovieContext {
  private movieStrategy: MovieStrategy;
  constructor(movieStrategy) {
    this.movieStrategy = movieStrategy;
  }

  setMovieStrategy(movieStrategy) {
    this.movieStrategy = movieStrategy;
  }

  updateMovieRepo() {
    this.movieStrategy.update();
  }
}
