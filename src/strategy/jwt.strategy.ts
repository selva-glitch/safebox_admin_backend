

// src/strategies/jwt-strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from "../interfaces/jwt-payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    /**
     * Constructor for initializing the configuration of the service.
     *
     * @param {ConfigService} configService - The configuration service instance used to fetch environment variables.
     * @throws {Error} If JWT_SECRET is not defined in environment variables.
     * @return {void}
     */
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') ?? '',
            algorithms: ['HS256'],
        });
    }


    /**
     * Validates the provided JWT payload.
     *
     * @param {JwtPayload} payload - The JWT payload to be validated.
     * @return {Promise<JwtPayload>} The validated JWT payload.
     * @throws {UnauthorizedException} If the payload is invalid or not provided.
     */
    async validate(payload: JwtPayload) {
        console.log("Decoded payload:", payload);
        if (!payload) throw new UnauthorizedException();
        return payload; // attaches to req.user
    }
}

