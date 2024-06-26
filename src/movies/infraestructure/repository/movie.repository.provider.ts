import { SharedTypes } from '../../../config/constants';
import { MoviePostgresRepository } from './movie.repository';

export const MovieRepoProvider = {
  provide: SharedTypes.MOVIE_REPO,
  useClass: MoviePostgresRepository,
};
