export interface MovieEntity {
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
}

export interface MovieEntityDT0 {
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
}
