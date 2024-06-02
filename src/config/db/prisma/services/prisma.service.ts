import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
// import { IPrismaClient } from './prisma.service.interface';
// import { ConfigService } from '@nestjs/config';
// import { AppConfiguration } from 'src/config/configuration.interface';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
