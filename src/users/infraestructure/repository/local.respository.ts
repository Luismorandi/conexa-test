import { Inject, Injectable, Logger } from '@nestjs/common';
import { Users } from '@prisma/client';
import { ROLES, SharedTypes } from 'src/config/constants';
import { PrismaService } from 'src/config/db/prisma/services/prisma.service';
import { UserEntity, UserEntityDT0 } from 'src/users/domain/user.entity';
import { UserRepository } from 'src/users/domain/user.repository';
import { UserValue } from 'src/users/domain/user.value';

@Injectable()
export class LocalRepository implements UserRepository {
  private readonly logger = new Logger(LocalRepository.name);
  constructor() {}

  async createUser(input: UserEntityDT0): Promise<UserEntity> {
    try {
      const newUser = new UserValue(input);
      return newUser;
    } catch (err) {
      throw err;
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      return null;
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string): Promise<UserEntity> {
    try {
      return null;
    } catch (err) {
      throw err;
    }
  }

  private convertPrismaUser(prismaUser: Users): UserEntity {
    return new UserValue({
      id: prismaUser.id,
      firstName: prismaUser.first_name,
      lastName: prismaUser.last_name,
      age: prismaUser.age,
      email: prismaUser.email,
      username: prismaUser.username,
      password: prismaUser.password,
      role: prismaUser.role as ROLES,
    });
  }
}
