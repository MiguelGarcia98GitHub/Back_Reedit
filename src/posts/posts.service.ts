import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Community } from 'src/communities/entities/community.entity';
import { CreateErrors, GetPostsByCommunityIdErrors } from './errors/errors';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Community)
    private communitiesRepository: Repository<Community>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const checkUser = await this.usersRepository.findOne({
      where: {
        id: createPostDto.creatorId,
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
      relations: ['posts', 'posts.creator'],
    });

    if (!checkCommunity) {
      throw new GetPostsByCommunityIdErrors().communityNotFound();
    }

    return checkCommunity.posts;
  }
}
