import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/entities/user.entity';

import { UsersController } from './users/users.controller';
import { CommunitiesModule } from './communities/communities.module';
import { Community } from './communities/entities/community.entity';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/entities/post.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // check that .env variables are being injected successfully
        // check that .env variables are being injected successfully
        // console.log('db_host_name:', configService.get<string>('db_host_name'));

        return {
          type: 'mysql',
          host: configService.get<string>('db_host_name'),
          database: configService.get<string>('db'),
          username: configService.get<string>('db_user_name'),
          password: configService.get<string>('db_password'),
          port: configService.get<number>('db_port'),
          // ssl: {
          //   rejectUnauthorized: false,
          // },
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
    }),
    // after db setup, import the actual modules being used
    UsersModule,
    CommunitiesModule,
    PostsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
