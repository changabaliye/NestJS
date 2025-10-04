import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: 'Please Provide a valid email' })
    email: string

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least six characters long' })
    password: string
}