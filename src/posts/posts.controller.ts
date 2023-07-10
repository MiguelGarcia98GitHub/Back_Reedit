import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { JWTRequest } from 'src/guards/interfaces/interfaces';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Request() req: JWTRequest) {
    return this.postsService.create(createPostDto, req); // Pass the decoded JWT to your service method (decoded data is on .user)
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
