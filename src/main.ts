import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
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
    }),
  );
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
