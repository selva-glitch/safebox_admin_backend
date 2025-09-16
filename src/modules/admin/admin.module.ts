import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from '../../controller/v1/admin/admin.controller';
import { AdminService } from '../../services/admin/admin.service';
import { Admin } from "../../entities/admin/admin.entity";
import { JwtModule } from '@nestjs/jwt';

/**
 * This module is responsible for handling operations related to cities.
 * It provides functionalities through its services and controllers for
 * managing city-related data.
 *
 * Imports:
 * - Configured to connect with the specified database entities:
 *   City, State, StateMaster, Country, CountryMaster using TypeOrmModule.
 *
 * Controllers:
 * - CityController: Manages REST API endpoints for city-related operations.
 *
 * Providers:
 * - CityService: Provides core logic and methods for handling city-related data.
 * - UsersService: Supports operations related to users interacting with city data.
 *
 * Exports:
 * - CityService: Allows other modules to access city management logic and functionality.
 */
@Module({
    imports: [TypeOrmModule.forFeature(
        [Admin]),
    JwtModule.register({
        secret: process.env.JWT_SECRET || 'yourSecretKey',
        signOptions: { expiresIn: '1h' },
    }),
    ],
    controllers: [AdminController],
    providers: [AdminService],
    exports: [AdminService]
})
export class AdminModule { }
