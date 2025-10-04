import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @IsEmail({}, { message: 'Please Provide a valid email' })
    email: string

    @IsNotEmpty({ message: 'name is rquired' })
    @IsString({ message: 'name must be string' })
    @MinLength(3, { message: 'name must be atleast three characters long' })
    @MaxLength(30, { message: 'name cant be longer than 256 characters ' })
    name: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be atleast 6 characters long' })
    password: string

}