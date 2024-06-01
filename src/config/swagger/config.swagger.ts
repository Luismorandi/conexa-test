import { DocumentBuilder } from '@nestjs/swagger';

export const options = new DocumentBuilder()
  .setTitle('API Documentation')
  .setDescription('API Documentation for conexa-test app')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
