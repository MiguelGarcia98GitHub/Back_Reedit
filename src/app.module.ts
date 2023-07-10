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
        // console.log('host_name:', configService.get<string>('host_name'));
        // console.log('database:', configService.get<string>('database'));
        // console.log('user_name:', configService.get<string>('user_name'));
        // console.log('password:', configService.get<string>('password'));
        // console.log('port:', configService.get<number>('port'));
        // console.log(
        //   'jwt_secret_encryption_key:',
        //   configService.get<string>('jwt_secret_encryption_key'),
        // );
        // console.log('backend_port:', configService.get<number>('backend_port'));

        return {
          type: 'mysql',
          host: configService.get<string>('host_name'),
          database: configService.get<string>('database'),
          username: configService.get<string>('user_name'),
          password: configService.get<string>('password'),
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
