import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dto/create-community.dto';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Post()
  create(@Body() createCommunityDto: CreateCommunityDto) {
    return this.communitiesService.create(createCommunityDto);
  }

  @Get('communityName/:communityName')
  GetCommunityByCommunityNameErrors(@Param('communityId') communityId: string) {
    return this.communitiesService.getCommunityByCommunityName(communityId);
  }

  @Get('user/:userId')
  getCommunitiesByUserId(@Param('userId') userId: number) {
    return this.communitiesService.getCreatedCommunitiesByUserId(userId);
  }
}
