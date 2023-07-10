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
  HttpCode,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { JWTRequest } from 'src/guards/interfaces/interfaces';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/post/:postId')
  getCommentsByPostId(@Param('postId') postId: number) {
    return this.commentsService.getCommentsByPostId(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(201)
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Request() req: JWTRequest,
  ) {
    return this.commentsService.create(createCommentDto, req);
  }
}
