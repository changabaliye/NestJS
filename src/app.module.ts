import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from './post/entities/post.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type : 'mysql',
        host : 'localhost',
        port : 3306,
        username : 'nestuser',
        password : 'nestpass',
        database : 'nestdb',
        entities : [Post,User], // array of entity that we want to register
        synchronize : true // dev mode
       }
    ),PostModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
