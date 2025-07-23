import { Injectable, NotFoundException } from '@nestjs/common';
// import { Post } from './interfaces/post.interface';
import {  Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
    // private posts: Post[] = [
    //     {
    //         id: 1,
    //         title: 'First Post',
    //         content: 'This is the content of the first post.',
    //         authorName: 'Author One',
    //         createdAt: new Date(),
    //     },
    // ];

    constructor(
        @InjectRepository(Post)
        private postRepository : Repository<Post>,
    ) {}


    async findAll(): Promise<Post[]> {
        return this.postRepository.find();
    }

    async findOne(id: number): Promise<Post> {
        const singlePost = await this.postRepository.findOneBy({id})

        if (!singlePost) {
            throw new NotFoundException(`Post With ID ${id} is not found`);
        }
        return singlePost;
    }

    async create(createPostData: CreatePostDto): Promise<Post> {
        const newPost: Post = this.postRepository.create({
            title : createPostData.title,
            content : createPostData.content,
            authorName : createPostData.authorName,
        })
        this.postRepository.save(newPost);
        return newPost;
    }

    async update(id : number, updatePostData :UpdatePostDto) : Promise<Post> {
        const findPostToEdit = await this.findOne(id);

        if(updatePostData.title) {
            findPostToEdit.title = updatePostData.title
        }

        if(updatePostData.content) {
            findPostToEdit.content = updatePostData.content
        }

        if(updatePostData.authorName) {
            findPostToEdit.authorName = updatePostData.authorName;
        }


        return this.postRepository.save(findPostToEdit);

        // if(postToEdit) {
        //     throw new NotFoundException(`Post With ID ${id} is not found`);
        // }

        // this.posts[postToEdit] = {
        //     ...this.posts[postToEdit],
        //     ...updatePostData,
        //     updatedAt : new Date()
        // }

        // return this.posts[postToEdit];
    }

    async remove(id:number) : Promise<void> {

        const findPostToDelete = await this.findOne(id);

        await this.postRepository.remove(findPostToDelete);

        console.log("Data deleted successfully")
        // const postIndex = this.posts.findIndex(post => post.id === id);

        // if(postIndex) {
        //     throw new NotFoundException(`Post With ID ${postIndex} is not found`);
        // }

        // this.posts = this.posts.filter(post => post.id !== id);

        // const response = {
        //     message : 'removed succesfully'
        // }

        // return response;

    }

    // private getNextId(): number {
    //     return this.posts.length > 0 ?
    //         Math.max(...this.posts.map(post => post.id)) + 1 : 1;
    // }
}
