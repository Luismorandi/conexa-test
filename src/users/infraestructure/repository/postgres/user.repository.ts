import { Inject, Injectable, Logger } from '@nestjs/common';
import { Users } from '@prisma/client';
import { randomUUID } from 'crypto';
import { ROLES, SharedTypes } from '../../../../config/constants';
import { PrismaService } from '../../../../config/db/prisma/services/prisma.service';
import {
  UserEntity,
  UserEntityDT0,
  ValidateUserDTO,
} from '../../../../users/domain/user.entity';
import { UserRepository } from '../../../../users/domain/user.repository';
import { UserValue } from '../../../../users/domain/user.value';

@Injectable()
export class UserPostgresRepository implements UserRepository {
  private readonly logger = new Logger(UserPostgresRepository.name);
  constructor(@Inject(SharedTypes.PRISMA) private prisma: PrismaService) {}

  async createUser(input: UserEntityDT0): Promise<UserEntity> {
    try {
      const newUser = new UserValue(input);
      const saveUser = await this.prisma.users.create({
        data: {
          id: randomUUID(),
          first_name: newUser.firstName,
          last_name: newUser.lastName,
          age: newUser.age,
          email: newUser.email,
          username: newUser.username,
          password: newUser.password,
          role: newUser.role,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      if (!saveUser) return null;
      return newUser;
    } catch (err) {
      throw err;
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.prisma.users.findFirst({
        where: {
          email: email,
        },
      });

      return user ? this.convertPrismaUser(user) : null;
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string): Promise<UserEntity> {
    try {
      const user = await this.prisma.users.findFirst({
        where: {
          id: id,
        },
      });

      return user ? this.convertPrismaUser(user) : null;
    } catch (err) {
      throw err;
    }
  }
  async validateUser(input: ValidateUserDTO): Promise<UserEntity> {
    try {
      const user = await this.prisma.users.findFirst({
        where: {
          OR: [{ email: input.email }, { username: input.username }],
        },
      });

      return user ? this.convertPrismaUser(user) : null;
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      const users = await this.prisma.users.findMany();

      return users ? users.map((u) => this.convertPrismaUser(u)) : null;
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
