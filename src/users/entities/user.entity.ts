import { Exclude } from 'class-transformer';
import { Comment } from 'src/comments/entities/comment.entity';
import { Community } from 'src/communities/entities/community.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Community, (community) => community.creator)
  communities: Community[];

  @OneToMany(() => Post, (post) => post.community)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
