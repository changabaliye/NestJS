import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostInterface } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsExistPipe } from './pipes/post-exists.pipe';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    // GET /post?search=nest

    @Get()
    findAll(@Query('search') search?: string): PostInterface[] {
        const extractAllPosts = this.postService.findAll();
           
        let alread = 5;
        if (search) {
            return extractAllPosts.filter(singlePost => singlePost.title.toLowerCase().includes(search))
        }

        return extractAllPosts;
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): PostInterface {
        return this.postService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    // if you want to use pipes only in this controller
    @UsePipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            disableErrorMessages: false,
        })
    )
    create(@Body() createPostData: CreatePostDto): PostInterface {
        return this.postService.create(createPostData);
    }

    @Put(':id')
    @UsePipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            disableErrorMessages: false,
        })
    )
    update(@Param('id', ParseIntPipe) id: number,
        @Body() updatedData: UpdatePostDto): PostInterface {
        return this.postService.update(id, updatedData)
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe, PostsExistPipe) id: number): { message: string } {
        return this.postService.remove(id);
    }
}

