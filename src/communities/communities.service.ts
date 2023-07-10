import { Injectable } from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Community } from './entities/community.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import {
  CreateErrors,
  GetCommunityByCommunityNameErrors,
  GetCreatedCommunitiesByUserErrors,
} from './errors/errors';
import { JWTRequest } from 'src/guards/interfaces/interfaces';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(Community)
    private communitiesRepository: Repository<Community>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(
    createCommunityDto: CreateCommunityDto,
    req: JWTRequest,
  ): Promise<Community> {
    const userIdFromJwt = req.user.id;

    const checkUser = await this.usersRepository.findOne({
      where: {
        id: userIdFromJwt,
      },
    });

    if (!checkUser) {
      throw new CreateErrors().userNotFound();
    }

    const checkName = await this.communitiesRepository.findOne({
      where: {
        name: createCommunityDto.name,
      },
    });

    if (checkName) {
      throw new CreateErrors().nameAlreadyExists();
    }

    const community = new Community();
    community.name = createCommunityDto.name;
    community.imageUrl = createCommunityDto.imageUrl;
    community.creator = checkUser;

    const savedCommunity = await this.communitiesRepository.save(community);

    delete savedCommunity.creator.password;

    return savedCommunity;
  }

  async getCommunityByCommunityName(communityName: string) {
    const checkCommunity = await this.communitiesRepository.findOne({
      where: {
        name: communityName,
      },
    });

    if (!checkCommunity) {
      throw new GetCommunityByCommunityNameErrors().nameNotFound();
    }

    return checkCommunity;
  }

  async getCreatedCommunitiesByUserId(userId: number) {
    const checkUser = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['communities'],
    });

    if (!checkUser) {
      throw new GetCreatedCommunitiesByUserErrors().userNotFound();
    }

    return checkUser.communities;
  }

  async getAllCommunities() {
    const allCommunities = await this.communitiesRepository.find();

    return allCommunities;
  }
}
