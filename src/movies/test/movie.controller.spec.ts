import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from '../infraestructure/controllers/movie.controller';
import { MovieUseCase } from '../application/movie.useCase';
import { CreateMovieDTO, UpdateMovieDTO } from '../application/dto/movies.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MOVIE_ENTITY_FAKE } from '../../movies/domain/fake.test.entity';
import { UserUseCase } from '../../users/application/user.useCases';

describe('MovieController', () => {
  let controller: MovieController;
  let service: MovieUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieUseCase,
          useValue: {
            findAllByZaga: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            createManyMovies: jest.fn(),
            updateMovie: jest.fn(),
            deleteMovie: jest.fn(),
          },
        },
        {
          provide: UserUseCase,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
    service = module.get<MovieUseCase>(MovieUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllByZaga', () => {
    it('should return an array of movies', async () => {
      const result = [MOVIE_ENTITY_FAKE];
      jest.spyOn(service, 'findAllByZaga').mockResolvedValue(result);

      expect(await controller.findAllByZaga('zaga1')).toBe(result);
    });

    it('should throw an exception', async () => {
      jest
        .spyOn(service, 'findAllByZaga')
        .mockRejectedValue(new Error('Error'));

      try {
        await controller.findAllByZaga('zaga1');
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.message).toBe(
          'error find all movies by zaga : Error: Error',
        );
        expect(err.status).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const result = [MOVIE_ENTITY_FAKE];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAlla()).toBe(result);
    });

    it('should throw an exception', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValue(new Error('Error'));

      try {
        await controller.findAlla();
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.message).toBe('error find all movies  : Error: Error');
        expect(err.status).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe('findById', () => {
    it('should return a movie', async () => {
      const result = MOVIE_ENTITY_FAKE;
      jest.spyOn(service, 'findById').mockResolvedValue(result);

      expect(await controller.findById('1')).toBe(result);
    });

    it('should throw an exception', async () => {
      jest.spyOn(service, 'findById').mockRejectedValue(new Error('Error'));

      try {
        await controller.findById('1');
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.message).toBe('error find specific movie: Error: Error');
        expect(err.status).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe('create', () => {
    it('should create and return movies', async () => {
      const result = [MOVIE_ENTITY_FAKE];
      const dto = new CreateMovieDTO();
      jest.spyOn(service, 'createManyMovies').mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
    });

    it('should throw an exception', async () => {
      const dto = new CreateMovieDTO();
      jest
        .spyOn(service, 'createManyMovies')
        .mockRejectedValue(new Error('Error'));

      try {
        await controller.create(dto);
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.message).toBe('error create movies by zaga : Error: Error');
        expect(err.status).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe('update', () => {
    it('should update and return a movie', async () => {
      const result = MOVIE_ENTITY_FAKE;
      const dto = new UpdateMovieDTO();
      jest.spyOn(service, 'updateMovie').mockResolvedValue(result);

      expect(await controller.update(dto)).toBe(result);
    });

    it('should throw an exception', async () => {
      const dto = new UpdateMovieDTO();
      jest.spyOn(service, 'updateMovie').mockRejectedValue(new Error('Error'));

      try {
        await controller.update(dto);
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.message).toBe('error update movie : Error: Error');
        expect(err.status).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe('delete', () => {
    it('should delete and return a movie', async () => {
      const result = MOVIE_ENTITY_FAKE;
      jest.spyOn(service, 'deleteMovie').mockResolvedValue(result);

      expect(await controller.delete('1')).toBe(result);
    });

    it('should throw an exception', async () => {
      jest.spyOn(service, 'deleteMovie').mockRejectedValue(new Error('Error'));

      try {
        await controller.delete('1');
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.message).toBe('error delete movie : Error: Error');
        expect(err.status).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });
});
