import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostInterface } from './interfaces/post.interface';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }
    
    // GET /post?search=nest

    @Get()
    findAll(@Query('search') search?: string): PostInterface[] {
        const extractAllPosts = this.postService.findAll();

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
    create(@Body() createPostData: Omit<PostInterface, 'id' | 'createdAt'>): PostInterface {
        return this.postService.create(createPostData);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number,
        @Body() updatedData: Partial<Omit<PostInterface, 'id' | 'createdAt'>>): PostInterface {
            return this.postService.update(id,updatedData)
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id',ParseIntPipe) id : number) : {message : string} {
        return this.postService.remove(id);
    }
}

