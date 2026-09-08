import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  postId: string | number;

  @IsOptional()
  reportedBy?: string | number;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsOptional()
  @IsString()
  description?: string;
}