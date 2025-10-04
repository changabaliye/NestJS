import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/rolesGuard';
import { Roles } from './decorators/roles.decorators';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]) // this will make the repository availaible for injection
    ,
    // Passport module 
    PassportModule,

    // configure JWT
    JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard],
  exports: [AuthService, RolesGuard]
})
export class AuthModule { }
