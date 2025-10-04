import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from "../auth.service";

/*
    ? class Jwt Strategy
        * inside class constructor

        * Validate method
*/

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authservice : AuthService) {
        super ({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey : 'jwtSecret',
            
        })
    }
}

