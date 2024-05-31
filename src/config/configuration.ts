import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const configuration = {
  port: process.env.PORT,
  hash: process.env.HASH_SALT,
};

export const CORS: CorsOptions = {
  origin: true,
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  credentials: true,
};
