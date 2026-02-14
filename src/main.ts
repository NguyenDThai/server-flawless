/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // lay express instance
  const server = app.getHttpAdapter().getInstance();
  // Tat 304 toan app
  server.disable('etag');
  app.enableCors({
    origin: ['http://localhost:3000', 'https://care-dev.vercel.app'],
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = {};
        errors.forEach((err) => {
          result[err.property] = Object.values(err.constraints || {})[0];
        });
        return new BadRequestException(result);
      },
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
