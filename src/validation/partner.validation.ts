import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, IsString, IsEnum, Min, IsNotEmpty, IsEmail, Matches, IsArray,  IsNumber, ValidateNested} from 'class-validator';
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


export class GetPartnerDto {
   @ApiProperty({ example: 1 })
   @Type(() => Number)
   @IsInt({ message: 'id must be an integer' })
   @Min(1, { message: 'id must be a positive number' })
   id: number;
}

export class CreatePartnerDto {
   @ApiProperty()
   @IsNotEmpty()
   name: string;
   @ApiProperty()
   @IsNotEmpty()
   company: string;
   @ApiProperty()
   @IsEmail()
   email: string;
   @ApiProperty()
   @Matches(/^[0-9]{10}$/, { message: 'Phone must be 10 digits' })
   phone: string;
   @ApiProperty()
   @Matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, { message: 'Invalid GST format' })
   gst: string;
   @ApiProperty()
   @IsEnum(['Reseller', 'Bulk Buyer', 'Both'])
   role: 'Reseller' | 'Bulk Buyer' | 'Both';
}


export class UpdateBulkLicenseDto {
  @ApiProperty()
  @IsInt()
  @Min(0)
  premiumTotal: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  goldTotal: number;
}


class PremiumPolicyDto {
  @ApiProperty()
  @IsNumber()
  base: number;
  
  @ApiProperty()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  discountedBands: number[];
}

class GoldPolicyDto {
  @ApiProperty()
  @IsNumber()
  base: number;
  
  @ApiProperty()
  @IsArray()
  @IsNumber({}, { each: true })
  discountedBands: number[];
}

export class UpdateResellPolicyDto {
  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => PremiumPolicyDto)
  premium?: PremiumPolicyDto;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => GoldPolicyDto)
  gold?: GoldPolicyDto;
}
