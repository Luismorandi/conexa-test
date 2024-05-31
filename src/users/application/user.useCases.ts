import { Inject } from '@nestjs/common';
import { UserEntity, UserEntityDT0 } from '../domain/user.entity';
import { UserRepository } from '../domain/user.repository';
import { LocalRepository } from '../infraestructure/repository/local.respository';
import { SharedTypes } from 'src/config/constants';

export class UserUseCase {
  constructor(
    @Inject(SharedTypes.USER_REPO)
    private readonly userRepository: UserRepository,
  ) {}

  public async createUser(input: UserEntityDT0): Promise<UserEntity> {
    const user = await this.userRepository.createUser(input);
    return user;
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  public async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    return user;
  }
}
