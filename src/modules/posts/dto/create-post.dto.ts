import { IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsOptional()
  author!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsNumber()
  replies?: number;

  @IsOptional()
  @IsNumber()
  likes?: number;

  @IsOptional()
  reported?: boolean;
}
