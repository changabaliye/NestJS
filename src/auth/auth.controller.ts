import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { currentUser } from './decorators/currentUser.decorator';
import { Roles } from './decorators/roles.decorators';
import { UserRole } from './entities/user.entity';
import { RolesGuard } from './guards/rolesGuard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        try {
            return this.authService.register(registerDto);
        } catch (error) {
            console.log(error)
        }
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        try {
            return this.authService.login(loginDto)
        } catch (error) {
            console.log(error)
        }

    }

    @Post('refresh')
    async refresh(@Body() body: { refreshToken: string }) {
        try {
            return this.authService.refreshToken(body.refreshToken)
        } catch (error) {
            console.log(error)
            throw error; // Re-throw to ensure proper error handling
        }
    }

    //  Protected Route
    //      Current user route
    //      Current user route
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@currentUser() user: any) {
        return user;
    }

    //  Protected Route
    //      use role in an admin user
    //      Current Admin route
    @Post('create-admin')
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    createAdmin(@Body() registerDto: RegisterDto) {
        return this.authService.createAdmin(registerDto);
    }


    // @Post()
}
