import { Injectable } from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Community } from './entities/community.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import {
  CreateErrors,
  GetCreatedCommunitiesByUserErrors,
} from './errors/errors';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(Community)
    private communitiesRepository: Repository<Community>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createCommunityDto: CreateCommunityDto): Promise<Community> {
    const checkUser = await this.usersRepository.findOne({
      where: {
        id: createCommunityDto.creatorId,
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
