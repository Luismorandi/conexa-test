import { Inject, Injectable, Logger } from '@nestjs/common';
import { Movies } from '@prisma/client';
import { SharedTypes } from 'src/config/constants';
import { PrismaService } from 'src/config/db/prisma/services/prisma.service';
import { MovieEntity } from 'src/movies/domain/movie.entity';
import { MovieRepository } from 'src/movies/domain/movie.repository';
import { MovieValue } from 'src/movies/domain/movie.value';

@Injectable()
export class MoviePostgresRepository implements MovieRepository {
  private readonly logger = new Logger(MoviePostgresRepository.name);
  constructor(@Inject(SharedTypes.PRISMA) private prisma: PrismaService) {}

  async findAll(): Promise<MovieEntity[]> {
    try {
      const movies = await this.prisma.movies.findMany();

      return movies
        ? movies.map((movie) => this.convertPrismaMovie(movie))
        : null;
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string): Promise<MovieEntity> {
    try {
      const movie = await this.prisma.movies.findFirst({ where: { id: id } });

      return movie ? this.convertPrismaMovie(movie) : null;
    } catch (err) {
      throw err;
    }
  }

  async findAllByZaga(zaga: string): Promise<MovieEntity[]> {
    try {
      const movies = await this.prisma.movies.findMany({
        where: {
          zaga: zaga,
        },
      });

      return movies.length > 0
        ? movies.map((movie) => this.convertPrismaMovie(movie))
        : [];
    } catch (err) {
      throw err;
    }
  }

  async findLastCreateByZaga(
    zaga: string,
    origin: string,
  ): Promise<MovieEntity | null> {
    try {
      const movie = await this.prisma.movies.findFirst({
        where: {
          zaga: zaga,
          origin: origin,
        },
        orderBy: {
          created_at: 'desc',
        },
      });

      return movie ? this.convertPrismaMovie(movie) : null;
    } catch (err) {
      throw err;
    }
  }

  async createMovies(movies: MovieEntity[]): Promise<MovieEntity[]> {
    try {
      movies.forEach((m) => {
        m.createdAt = new Date();
        m.updatedAt = new Date();
      });
      const moviesPrisma = this.convertMovieToPrisma(movies);
      const movie = await this.prisma.movies.createMany({
        data: moviesPrisma,
        skipDuplicates: true,
      });

      return movies ? movies : null;
    } catch (err) {
      throw err;
    }
  }

  async updateMovie(input: MovieEntity, id: string): Promise<MovieEntity> {
    try {
      const moviesPrisma = this.convertMovieToPrisma([input]);
      moviesPrisma.forEach((m) => {
        m.updated_at = new Date();
      });
      const movie = await this.prisma.movies.update({
        where: { id: id },
        data: moviesPrisma[0],
      });

      return movie ? this.convertPrismaMovie(movie) : null;
    } catch (err) {
      throw err;
    }
  }

  async deleteMovie(id: string): Promise<MovieEntity> {
    try {
      const movie = await this.prisma.movies.delete({
        where: { id: id },
      });
      return movie ? this.convertPrismaMovie(movie) : null;
    } catch (err) {
      throw err;
    }
  }

  private convertPrismaMovie(prismaMovie: Movies): MovieEntity {
    return new MovieValue({
      id: prismaMovie.id,
      title: prismaMovie.title,
      episode: prismaMovie.episode,
      director: prismaMovie.director,
      description: prismaMovie.description,
      producer: prismaMovie.producer,
      releaseDate: prismaMovie.release_date,
      otherDetails: prismaMovie.other_details,
      origin: prismaMovie.origin,
      createdAt: prismaMovie.created_at,
      updatedAt: prismaMovie.updated_at,
      zaga: prismaMovie.zaga,
    });
  }

  private convertMovieToPrisma(movies: MovieEntity[]): Movies[] {
    return movies.map((m) => {
      return {
        id: m.id,
        title: m.title,
        episode: m.episode,
        director: m.director,
        producer: m.producer,
        description: m.description,
        release_date: m.releaseDate,
        origin: m.origin,
        other_details: m.otherDetails,
        zaga: m.zaga,
        created_at: m.createdAt,
        updated_at: m.updatedAt,
      };
    });
  }
}
