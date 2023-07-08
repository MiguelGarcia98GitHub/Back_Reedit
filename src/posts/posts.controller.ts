import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get('/community/:communityId')
  getPostsByCommunityId(@Param('communityId') communityId: number) {
    return this.postsService.getPostsByCommunityId(communityId);
  }

  @Get('/communityName/:communityName')
  getPostsByCommunityName(@Param('communityName') communityName: string) {
    return this.postsService.getPostsByCommunityName(communityName);
  }

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get('/:postId')
  getPostById(@Param('postId') postId: number) {
    return this.postsService.getPostById(postId);
  }
}
