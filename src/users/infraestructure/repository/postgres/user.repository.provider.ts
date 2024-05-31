import { SharedTypes } from 'src/config/constants';
import { UserPostgresRepository } from './user.repository';

export const UserRepoProvider = {
  provide: SharedTypes.USER_REPO,
  useClass: UserPostgresRepository,
};
