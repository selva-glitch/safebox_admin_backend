import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) for admin login.
 * Ensures request body contains valid email and password.
 */
export class AdminLoginDto {
  /**
   * Admin email address
   * - Must be a valid email format
   */
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @ApiProperty()
  email: string;

  /**
   * Admin password
   * - Must be a string
   * - Minimum length: 6 characters
   */
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @ApiProperty()
  password: string;
}
