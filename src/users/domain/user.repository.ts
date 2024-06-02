import { UserEntity, UserEntityDT0, ValidateUserDTO } from './user.entity';

export interface UserRepository {
  createUser(input: UserEntityDT0): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity>;
  validateUser(input: ValidateUserDTO): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
}
