import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
/**
 * Response structure returned after an admin login attempt.
 */

/**
 * Detailed information returned when login succeeds.
 */
class LoginDetails {
  /** Unique identifier of the admin user */
   @ApiProperty()
  id: number;

  /** Name of the logged-in admin */
   @ApiProperty()
  name: string;

  /** Authentication token (usually JWT) for subsequent requests */
   @ApiProperty()
  token: string;
}
export class LoginResponseType {
  /** 
   * Indicates whether the login was successful.
   * true = success, false = failure
   */
  @ApiProperty()
  status: boolean;

  /**
   * Human-readable message (e.g., "Login successful", "Invalid credentials").
   */
  @ApiProperty()
  message: string;

  /**
   * Flag for errors.
   * true = error occurred, false = no error.
   */
  @ApiProperty()
  error: boolean;

  /**
   * Login details (only present if login was successful).
   */
  @ApiProperty({type: LoginDetails})
  data?: LoginDetails;

  /**
   * HTTP status code or custom status code (e.g., 200, 401).
   */
  @ApiProperty()
  code: number;
}

