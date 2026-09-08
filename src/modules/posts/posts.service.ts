import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const newPost: Post = {
      id: this.posts.length + 1,
      ...createPostDto,
      author: createPostDto.author || 'Anonymous',
      title: createPostDto.title || 'Untitled',
      content: createPostDto.content || '',
      category: createPostDto.category || '',
      replies: 0,
      likes: 0,
      reported: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.posts.push(newPost);
    return newPost;
  }
}
