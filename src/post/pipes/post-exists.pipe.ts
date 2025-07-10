import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { PostService } from "../post.service";


@Injectable()
export class PostsExistPipe implements PipeTransform {

    constructor(private readonly postService: PostService) { }

    transform(value: any, metadata: ArgumentMetadata) {
        try {
            this.postService.findOne(value)
        } catch (error) {
            throw new NotFoundException(`Post with the ID ${value} not found`)
        }
        return value;
    }
}