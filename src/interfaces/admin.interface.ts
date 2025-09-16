/**
 * Response structure returned after an admin login attempt.
 */
export interface LoginResponseType {
  /** 
   * Indicates whether the login was successful.
   * true = success, false = failure
   */
  status: boolean;

  /**
   * Human-readable message (e.g., "Login successful", "Invalid credentials").
   */
  message: string;

  /**
   * Flag for errors.
   * true = error occurred, false = no error.
   */
  error: boolean;

  /**
   * Login details (only present if login was successful).
   */
  data?: LoginDetails;

  /**
   * HTTP status code or custom status code (e.g., 200, 401).
   */
  code: number;
}

/**
 * Detailed information returned when login succeeds.
 */
interface LoginDetails {
  /** Unique identifier of the admin user */
  id: number;

  /** Name of the logged-in admin */
  name: string;

  /** Authentication token (usually JWT) for subsequent requests */
  token: string;
}
