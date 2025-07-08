import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostService {
    private posts : Post[] = [
        {
            id : 1,
            title : 'First Post',
            content : 'This is the content of the first post.',
            authorName : 'Author One',
            createdAt : new Date(),
        },
    ];

    findAll() : Post[] {
        return this.posts;
    }

    findOne(id : number):Post {
        const singlePost = this.posts.find(post => post.id === id)

        if(!singlePost) {
            throw new NotFoundException(`Post With ID ${id} is not found`);
        }
        return singlePost;
    }
}
