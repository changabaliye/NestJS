import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "../entities/user.entity";
import { ROLES_KEY } from "../decorators/roles.decorators";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        // its a utiltiy that will help us to access the metadata
        private reflector: Reflector
    ) { }

    // next method -> 

    canActivate(context: ExecutionContext): boolean {
        // retrive the roles metadata set by the roles decorator
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]> (
            ROLES_KEY, [
                context.getHandler(), // method level metadata
                context.getClass()  // class level metadata
            ]
        )

        if(!requiredRoles) {
            return true;
        }

        const {user} = context.switchToHttp().getRequest();

        if(!user) {
            throw new ForbiddenException('User not authenticated');
        }

        const hasRequiredRole = requiredRoles.some(role => user.role === role);

        if(!hasRequiredRole) {
            throw new ForbiddenException("Insufficient permission")
        }

        return true;
    }
}