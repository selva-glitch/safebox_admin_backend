import {Request} from 'express';

/**
 * JwtPayload interface extends the Request object to include additional properties
 * related to a JSON Web Token (JWT) payload. It represents the structure of the
 * JWT token and user-related data received in the payload.
 *
 * Properties of the `user` object in the payload:
 * - `sub`: Represents the user ID, typically sourced from a backend system like Laravel.
 * - `iss`: Indicates the issuer of the JWT token.
 * - `iat`: Represents the timestamp when the token was issued.
 * - `exp`: Indicates the expiration timestamp of the token.
 * - `nbf`: Denotes the timestamp before which the token is not valid.
 * - `jti`: A unique identifier for the token.
 *
 * Additional custom user-related properties from the JWT token may also be added
 * to this interface as required.
 */
export interface JwtPayload extends Request {
    user: {
        sub: number;  // user ID in Laravel
        iss: string;  // expiration timestamp
        iat: number;  // issued at timestamp
        exp: number;  // issued at timestamp
        nbf: number;  // issued at timestamp
        jti: string;  // issued at timestamp
        // add other user properties that come from your JWT token
    };
}
