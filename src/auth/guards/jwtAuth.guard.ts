import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// protect routes that require authentication

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }