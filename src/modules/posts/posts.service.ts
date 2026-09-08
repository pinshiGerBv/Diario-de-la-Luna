import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const newPost: Post = {
      id: Date.now(),
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

  async getAll(): Promise<Post[]> {
    return [...this.posts.reverse()];
  }

  getById(id: number): Post {
    const post = this.posts.find((p) => p.id === id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }
}
