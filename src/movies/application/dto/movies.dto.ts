import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDTO {
  @IsNotEmpty()
  movies: MovieDTO[];
}

export class MovieDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  episode: number;

  @IsNotEmpty()
  @IsString()
  director: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  producer: string;

  @IsNotEmpty()
  @IsString()
  releaseDate: string;

  @IsOptional()
  otherDetails: any;

  @IsNotEmpty()
  @IsString()
  origin: string;
  @IsNotEmpty()
  @IsOptional()
  createdAt: Date;
  @IsNotEmpty()
  @IsOptional()
  updatedAt: Date;

  @IsNotEmpty()
  @IsString()
  zaga: string;
}
export class UpdateMovieDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  episode: number;

  @IsOptional()
  @IsString()
  director: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  producer: string;

  @IsOptional()
  @IsString()
  releaseDate: string;

  @IsOptional()
  otherDetails: any;

  @IsOptional()
  @IsString()
  origin: string;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;

  @IsOptional()
  @IsString()
  zaga: string;
}
