/**
 * Represents a validation error for a specific field.
 * Example:
 * {
 *   field: "email",
 *   errors: ["Email must be a valid email address", "Email is required"]
 * }
 */
export interface ValidationErrorDetailType {
  field: string;
  errors: string[];
}

/**
 * Standard success response format for API calls.
 * Example:
 * {
 *   status: true,
 *   message: "Login successful",
 *   data: { id: 1, name: "John" },
 *   error: false
 * }
 */
export interface successResponseType {
  status: boolean;
  message: string;
  data?: unknown;   // Can be any payload (user, list, etc.)
  error: boolean;   // Usually false on success
}

/**
 * Standard error response format for unexpected server errors.
 * Example:
 * {
 *   status: false,
 *   message: "Internal server error",
 *   error: "Stack trace or error object"
 * }
 */
export interface errorResponseType {
  status: boolean;
  message: string;
  error?: unknown; // Optional: can include stack trace, message, or null
}

/**
 * Standard response format for validation errors.
 * Example:
 * {
 *   status: false,
 *   message: "Validation Error",
 *   error: [
 *     { field: "email", errors: ["Email is required"] },
 *     { field: "password", errors: ["Password must be at least 8 characters"] }
 *   ]
 * }
 */
export interface validationErrorResponseType {
  status: boolean;
  message: string;
  error?: unknown; // Usually an array of ValidationErrorDetailType[]
}
