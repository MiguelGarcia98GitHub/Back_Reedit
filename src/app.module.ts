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

        return {
          type: 'mysql',
          host: configService.get<string>('host_name'),
          database: configService.get<string>('database'),
          username: configService.get<string>('user_name'),
          password: configService.get<string>('password'),
          port: configService.get<number>('port'),
          // ssl: {
          //   rejectUnauthorized: false,
          // },
          entities: [User, Community],
          synchronize: true,
        };
      },
    }),
    // after db setup, import the actual modules being used
    UsersModule,
    CommunitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
