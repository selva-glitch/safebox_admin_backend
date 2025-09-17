import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, IsString, IsEnum, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ListParamsDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ example: 'john' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: ['Reseller', 'Bulk Buyer', 'Both'] })
  @IsOptional()
  @IsEnum(['Reseller', 'Bulk Buyer', 'Both'], { message: 'role must be one of Reseller, Bulk Buyer, Both' })
  role?: string;

  @ApiPropertyOptional({ enum: ['Active', 'Suspended'] })
  @IsOptional()
  @IsEnum(['Active', 'Suspended'], { message: 'status must be Active or Suspended' })
  status?: string;
}
