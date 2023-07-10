import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from './entities/comment.entity';
import { CreateErrors, GetCommentsByPostIdErrors } from './errors/errors';
import { JWTRequest } from 'src/guards/interfaces/interfaces';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    req: JWTRequest,
  ): Promise<Comment> {
    const userIdFromJwt = req.user.id;

    const checkUser = await this.usersRepository.findOne({
      where: {
        id: userIdFromJwt,
      },
    });

    if (!checkUser) {
      throw new CreateErrors().userNotFound();
    }

    const checkPost = await this.postsRepository.findOne({
      where: {
        id: createCommentDto.postId,
      },
    });

    if (!checkPost) {
      throw new CreateErrors().postNotFound();
    }

    const savedComment = await this.commentsRepository.save({
      content: createCommentDto.content,
      user: checkUser,
      post: checkPost,
    });

    delete savedComment.user.password;

    return savedComment;
  }
  async getCommentsByPostId(postId: number): Promise<Comment[]> {
    const checkPost = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
      relations: ['comments', 'comments.user'],
    });

    if (!checkPost) {
      throw new GetCommentsByPostIdErrors().postNotFound();
    }

    checkPost.comments.forEach((comment) => {
      delete comment.user.password;
    });

    return checkPost.comments;
  }
}
