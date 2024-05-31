import { Inject, Injectable, Logger } from '@nestjs/common';
import { Users } from '@prisma/client';
import { ROLES, SharedTypes } from 'src/config/constants';
import { PrismaService } from 'src/config/db/prisma/services/prisma.service';
import { UserEntity, UserEntityDT0 } from 'src/users/domain/user.entity';
import { UserRepository } from 'src/users/domain/user.repository';
import { UserValue } from 'src/users/domain/user.value';

@Injectable()
export class UserPostgresRepository implements UserRepository {
  private readonly logger = new Logger(UserPostgresRepository.name);
  constructor(@Inject(SharedTypes.PRISMA) private prisma: PrismaService) {}

  async createUser(input: UserEntityDT0): Promise<UserEntity> {
    try {
      const newUser = new UserValue(input);
      const saveUser = await this.prisma.users.create({
        data: {
          id: newUser.id,
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
