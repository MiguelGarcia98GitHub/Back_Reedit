import { Exclude } from 'class-transformer';
import { Community } from 'src/communities/entities/community.entity';
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
}
