import { SharedTypes } from '../../../../config/constants';
import { StarWarsRepository } from './swapi.repository';

export const StarWarsProvider = {
  provide: SharedTypes.SWAPI_REPO,
  useClass: StarWarsRepository,
};
