import { MovieEntity, MovieEntityDT0 } from './movie.entity';

export class MovieValue implements MovieEntity {
  id?: string;
  title: string;
  episode: number;
  director: string;
  openingCrawl: string;
  producer: string;
  releaseDate: string;
  otherDetails: any;
  origin: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(movie: MovieEntityDT0) {
    (this.id = movie.id),
      (this.title = movie.title),
      (this.episode = movie.episode),
      (this.director = movie.director),
      (this.openingCrawl = movie.openingCrawl),
      (this.producer = movie.producer),
      (this.releaseDate = movie.releaseDate),
      (this.otherDetails = movie.otherDetails);
    (this.origin = movie.origin),
      (this.createdAt = movie.createdAt),
      (this.updatedAt = movie.updatedAt);
  }

  update() {
    this.updatedAt = new Date();
  }
}
