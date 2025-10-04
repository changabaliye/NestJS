import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../entities/user.entity';
//  -> unique identifier for storing and retriving role requirements as metadata on route handler
export const ROLES_KEY = 'roles'
// -> roles decorator the routes with the roles that are allowed to access them
//  -> roles guard will later reads this metadata to check if the user has permission
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles)
