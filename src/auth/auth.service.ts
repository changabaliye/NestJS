// All buissness login remain here

import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtService: JwtService
    ) { }
    //  Regstering User
    async register(registerDto: RegisterDto) {
        const exsitingUser = await this.userRepo.findOne({
            where: { email: registerDto.email }
        })

        if (exsitingUser) {
            throw new ConflictException('Email already in use...')
        }

        const hashedPassword = await this.hashPassword(registerDto.password);

        const newlyCreatedUser = this.userRepo.create({
            email: registerDto.email,
            name: registerDto.name,
            password: hashedPassword,
            role: UserRole.USER
        })

        const savedUser = await this.userRepo.save(newlyCreatedUser);

        const { password, ...result } = savedUser

        return {
            user: result,
            message: 'Registration Successful! Please login to continue'
        }
    }

    // You can use ccm Panel
    // Admin creation

    async createAdmin(registerDto: RegisterDto) {
        const exsitingUser = await this.userRepo.findOne({
            where: { email: registerDto.email }
        })

        if (exsitingUser) {
            throw new ConflictException('Email already in use...')
        }

        const hashedPassword = await this.hashPassword(registerDto.password);

        const newlyCreatedUser = this.userRepo.create({
            email: registerDto.email,
            name: registerDto.name,
            password: hashedPassword,
            role: UserRole.ADMIN
        })

        const savedUser = await this.userRepo.save(newlyCreatedUser);

        const { password, ...result } = savedUser

        return {
            user: result,
            message: 'Admin user created Successfuly! Please login to continue'
        }
    }

    //  Login Service

    async login(loginDto: LoginDto) {
        const user = await this.userRepo.findOne({
            where: { email: loginDto.email }
        })

        if (!user || !(await this.verifyPassword(loginDto.password, user.password))) {
            throw new UnauthorizedException('Inavalid credentials or account not exists')
        }

        //  generate tokens
        const tokens = await this.generateTokens(user);
        const { password, ...result } = user;

        return {
            user: result,
            ...tokens
        }
    }

    // refresh token

    async refreshToken(refreshToken: string) {
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token is required')
        }

        try {
            // Verify the refresh token
            const payload = this.jwtService.verify(refreshToken, {
                secret: 'refreshToken'
            });

            // Find the user by the sub claim (user id)
            const user = await this.userRepo.findOne({
                where: { id: payload.sub }
            });

            if (!user) {
                throw new UnauthorizedException('User not found for token')
            }

            // Generate a new access token
            const accessToken = this.generateAccessToken(user);

            return {
                accessToken,
                message: 'Token refreshed successfully'
            };
        } catch (error) {
            console.log('Refresh token error:', error.message);

            if (error.name === 'JsonWebTokenError') {
                throw new UnauthorizedException('Invalid refresh token format')
            } else if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('Refresh token expired')
            } else {
                throw new UnauthorizedException('Invalid token')
            }
        }
    }

    // to find the current user by id
    async getUserById(id: number) {
        const user = await this.userRepo.findOne({
            where: { id: id }
        })

        if (!user) {
            throw new UnauthorizedException('User not found')
        }

        const { password, ...result } = user;

        return {
            ...result
        }
    }


    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10)
    }

    private async verifyPassword(loginPassword: string, userPassword: string): Promise<boolean> {
        return bcrypt.compare(loginPassword, userPassword)
    }

    private async generateTokens(user: User) {
        return {
            accessToken: this.generateAccessToken(user),
            refreshToken: this.generateRefreshToken(user)
        }
    }
    //ole payload contains email,id and role
    private generateAccessToken(user: User): string {
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role
        }

        return this.jwtService.sign(payload, {
            secret: 'jwtSecret',
            expiresIn: '15m'
        });
    }

    private generateRefreshToken(user: User): string {
        const payload = {
            sub: user.id
        }

        return this.jwtService.sign(payload, {
            secret: 'refreshToken',
            expiresIn: '7d'
        })
    }
}
