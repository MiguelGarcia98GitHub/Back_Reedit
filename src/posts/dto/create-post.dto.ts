import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  imageUrl: string;

  @IsNotEmpty()
  @IsInt()
  communityId: number;
}
