import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from 'src/communities/entities/community.entity';
import { User } from 'src/users/entities/user.entity';
import { Post } from './entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Community, User, Post])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
