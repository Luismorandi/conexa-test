import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const configuration = {
  port: process.env.PORT,
  hash: process.env.HASH_SALT,
  jwtSecret: process.env.JWT_SECRET,
};

export const CORS: CorsOptions = {
  origin: true,
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  credentials: true,
};
