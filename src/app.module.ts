import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import Joi, * as joi from 'joi';
import appConfig from './config/app.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes configModule globally availaible
      // validationSchema : joi.object({
      //   APP_NAME: Joi.string().default('defaultApp')
      // })
      load: [appConfig]
    }), HelloModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
