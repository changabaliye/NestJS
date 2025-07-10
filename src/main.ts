import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //global setting
  //env

  //starts a http server

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties that dont have decorators
      forbidNonWhitelisted: true,
      transform: true, // automatically transforms payloads to be objects type according to their dto class
      disableErrorMessages: true
    })
  )

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();