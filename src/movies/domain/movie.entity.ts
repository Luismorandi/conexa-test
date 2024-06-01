export interface MovieEntity {
  id?: string;
  title: string;
  episode: number;
  director: string;
  openingCrawl: string;
  producer: string;
  releaseDate: Date;
  otherDetails: any;
  origin: string;
  createdAt: Date;
  updatedAt: Date;
}
