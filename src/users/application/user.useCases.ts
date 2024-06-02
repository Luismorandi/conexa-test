import { Inject } from '@nestjs/common';
import { UserEntity, UserEntityDT0 } from '../domain/user.entity';
import { UserRepository } from '../domain/user.repository';
import { SharedTypes } from '../../config/constants';
import * as bcrypt from 'bcrypt';

export class UserUseCase {
  constructor(
    @Inject(SharedTypes.USER_REPO)
    private readonly userRepository: UserRepository,
  ) {}

  public async createUser(input: UserEntityDT0): Promise<UserEntity> {
    const user = await this.userRepository.validateUser({
      email: input.email,
      username: input.username,
    });
    const existingFields: string[] = [];
    if (user) {
      if (user.email === input.email)
        existingFields.push(`email: ${input.email}`);
      if (user.username === input.username)
        existingFields.push(`username: ${input.username}`);
      const errorMessage = `User with ${existingFields.join(' and ')} already exists`;
      throw new Error(errorMessage);
    }

    input.password = bcrypt.hashSync(input.password.toString(), 10);
    const newUser = await this.userRepository.createUser(input);
    return newUser;
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  public async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    return user;
  }

  public async getAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
}
