import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdatePostDto {
    @IsOptional()
    @IsNotEmpty({ message: 'Title is rquired' })
    @IsString({ message: 'Title must be string' })
    @MinLength(3, { message: 'Title must be atleast three characters long' })
    @MaxLength(256, { message: 'Title cant be longert than 256 characters ' })
    title?: string

    @IsOptional()
    @IsNotEmpty({ message: 'Content is required' })
    @IsString({ message: 'Content must be string' })
    @MinLength(3, { message: 'Content must be atleast three characters long' })
    @MaxLength(25, { message: 'Content cant be longert than 256 characters ' })
    content?: string

    @IsOptional()
    @IsNotEmpty({ message: 'Author is rquired' })
    @IsString({ message: 'Author must be string' })
    @MinLength(3, { message: 'Author must be atleast three characters long' })
    @MaxLength(25, { message: 'Author cant be longert than 256 characters ' })
    authorName?: string

}