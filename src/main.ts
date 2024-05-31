import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS, configuration } from './config/configuration';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors(CORS);
  app.enableShutdownHooks();

  const PORT = configuration.port;
  await app.listen(PORT);
}
bootstrap();
