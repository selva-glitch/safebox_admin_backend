import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from "express";
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });
  // Add body parser middleware
  app.use(json({ limit: '50mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formatted = errors.map((err) => ({
          field: err.property,
          errors: Object.values(err.constraints || {}),
        }));
        return new BadRequestException({
          status: false,
          message: 'Validation failed',
          details: formatted,
        });
      },
    }),
  );
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
