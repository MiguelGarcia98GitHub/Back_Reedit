import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Community } from 'src/communities/entities/community.entity';
import {
  CreateErrors,
  GetPostByIdErrors,
  GetPostsByCommunityIdErrors,
  GetPostsByCommunityNameErrors,
} from './errors/errors';
import { JWTRequest } from 'src/guards/interfaces/interfaces';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Community)
    private communitiesRepository: Repository<Community>,
  ) {}

  async create(createPostDto: CreatePostDto, req: JWTRequest): Promise<Post> {
    console.log('req:');
    console.log(req);
    console.log('req.user:');
    console.log(req.user);

    const userIdFromJwt = req.user.id;

    const checkUser = await this.usersRepository.findOne({
      where: {
        id: userIdFromJwt,
      },
    });

    if (!checkUser) {
      throw new CreateErrors().userNotFound();
    }

    const checkCommunity = await this.communitiesRepository.findOne({
      where: {
        id: createPostDto.communityId,
      },
    });

    if (!checkCommunity) {
      throw new CreateErrors().communityNotFound();
    }

    const savePost = await this.postsRepository.save({
      ...createPostDto,
      creator: checkUser,
      community: checkCommunity,
    });

    delete savePost.creator.password;

    return savePost;
  }

  async getPostsByCommunityId(communityId: number): Promise<Post[]> {
    const checkCommunity = await this.communitiesRepository.findOne({
      where: {
        id: communityId,
      },
      relations: [
        'posts',
        'posts.creator',
        'posts.comments',
        'posts.comments.user',
      ],
    });

    if (!checkCommunity) {
      throw new GetPostsByCommunityIdErrors().communityNotFound();
    }

    return checkCommunity.posts;
  }

  async getPostsByCommunityName(communityName: string): Promise<Post[]> {
    const checkCommunity = await this.communitiesRepository.findOne({
      where: {
        name: communityName,
      },
      relations: [
        'posts',
        'posts.creator',
        'posts.comments',
        'posts.comments.user',
        'posts.community',
      ],
    });

    if (!checkCommunity) {
      throw new GetPostsByCommunityNameErrors().communityNotFound();
    }

    return checkCommunity.posts;
  }

  async getAllPosts() {
    const allPosts = await this.postsRepository.find({
      relations: ['community'],
    });

    return allPosts;
  }

  async getPostById(postId: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
      relations: ['comments', 'community', 'comments.user'],
    });

    if (!post) {
      throw new GetPostByIdErrors().postNotFound();
    }

    return post;
  }
}
