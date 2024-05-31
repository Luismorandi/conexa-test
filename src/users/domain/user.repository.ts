import { ROLES } from 'src/config/constants';
import { UserEntity, UserEntityDT0 } from './user.entity';
import { randomUUID } from 'crypto';

export interface UserRepository {
  createUser(input: UserEntityDT0): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity>;
}
