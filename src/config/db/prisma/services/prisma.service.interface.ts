import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export interface IPrismaClient {
  enableShutdownHooks(app: INestApplication): void;
  getClient(): PrismaClient;
}
