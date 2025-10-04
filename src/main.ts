import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //global setting
  //env
  45
  //starts a http server bodies automatically
  // validating incoming requests 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties that dont have decorators
      forbidNonWhitelisted: true, // Rejects requests that contain properties not in your DTO
      transform: true, // automatically transforms payloads to be objects type according to their dto class
      disableErrorMessages: false,
    })
  )

  await app.listen(process.env.PORT ?? 3002, () => {
    console.log(`App is running on port ${3002}`)
  });

  
}
bootstrap();