import { Community } from 'src/communities/entities/community.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @ManyToOne(() => User, (user) => user.posts)
  creator: User;

  @ManyToOne(() => Community, (community) => community.posts)
  community: Community;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
