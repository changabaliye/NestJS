import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostService {
    private posts: Post[] = [
        {
            id: 1,
            title: 'First Post',
            content: 'This is the content of the first post.',
            authorName: 'Author One',
            createdAt: new Date(),
        },
    ];

    findAll(): Post[] {
        return this.posts;
    }

    findOne(id: number): Post {
        const singlePost = this.posts.find(post => post.id === id)

        if (!singlePost) {
            throw new NotFoundException(`Post With ID ${id} is not found`);
        }
        return singlePost;
    }

    create(createPostData: Omit<Post, 'id' | 'createdAt'>): Post {
        const newPost: Post = {
            id: this.getNextId(),
            ...createPostData,
            createdAt: new Date()
        }
        this.posts.push(newPost);
        return newPost;
    }

    update(id : number, updatePostData : Partial<Omit<Post, 'id' | 'createdAt'>>) : Post {
        const postToEdit = this.posts.findIndex(post => post.id === id);

        if(postToEdit) {
            throw new NotFoundException(`Post With ID ${id} is not found`);
        }

        this.posts[postToEdit] = {
            ...this.posts[postToEdit],
            ...updatePostData,
            updatedAt : new Date()
        }

        return this.posts[postToEdit];
    }

    remove(id:number) : {message : string} {
        const postIndex = this.posts.findIndex(post => post.id === id);

        if(postIndex) {
            throw new NotFoundException(`Post With ID ${postIndex} is not found`);
        }

        this.posts = this.posts.filter(post => post.id !== id);

        const response = {
            message : 'removed succesfully'
        }

        return response;

    }

    private getNextId(): number {
        return this.posts.length > 0 ?
            Math.max(...this.posts.map(post => post.id)) + 1 : 1;
    }
}
