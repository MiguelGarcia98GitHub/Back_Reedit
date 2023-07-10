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
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { JWTRequest } from 'src/guards/interfaces/interfaces';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(201)
  create(
    @Body() createCommunityDto: CreateCommunityDto,
    @Request() req: JWTRequest,
  ) {
    return this.communitiesService.create(createCommunityDto, req);
  }

  @Get('communityName/:communityName')
  GetCommunityByCommunityNameErrors(
    @Param('communityName') communityName: string,
  ) {
    return this.communitiesService.getCommunityByCommunityName(communityName);
  }

  @Get('user/:userId')
  getCommunitiesByUserId(@Param('userId') userId: number) {
    return this.communitiesService.getCreatedCommunitiesByUserId(userId);
  }

  @Get()
  getAllCommunities() {
    return this.communitiesService.getAllCommunities();
  }
}
