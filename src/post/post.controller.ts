import { Controller,Get, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostInterface} from './interfaces/post.interface';
import { single } from 'rxjs';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    findAll(@Query('search') search? :string): PostInterface[] {
        const extractAllPosts = this.postService.findAll();

        if(search) {
            return extractAllPosts.filter(singlePost => singlePost.title.toLowerCase().includes(search))
        }

        return extractAllPosts;
    }

    @
}
 