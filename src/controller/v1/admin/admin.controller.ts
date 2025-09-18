import { Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AdminService } from '../../../services/admin/admin.service';
import { AdminLoginDto } from '../../../validation/admin.validation';
import { CommonController } from '../../common.controller';
import { LoginResponseType } from '../../../interfaces/admin.interface';
import {SwaggerAdminLogin} from '../../../decorators/swagger.decorators'




@Controller('v1/admin')
export class AdminController extends CommonController {
    constructor(
        private readonly adminService: AdminService, // Service to handle admin-related business logic
    ) {
        super(); // Inherit methods from CommonController (e.g., response formatting, validation helpers)
    }

    /**
     * Handles admin login request
     * 
     * @route POST /v1/admin/login
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @returns {Promise<Response>} JSON response containing login status and data
     */
    @Post('/login')
    @SwaggerAdminLogin()
    @HttpCode(200)
    async adminLogin(@Req() req: Request, @Res() res: Response): Promise<Response> {
        try {
            // Validate request body using AdminLoginDto
            const [params, error, isError] = this.requestValidation(AdminLoginDto, 'Post', req['context'].body);
            
            // If validation fails, return error response
            if (isError) {
                return res.status(400).json(this.formatResponse(this.validationErrorResponse(error)));
            }

            // Authenticate admin using email and password
            const data: LoginResponseType = await this.adminService.validateAdminLogin(params.email, params.password);

            // Return success response with login data
            return res.status(data.code).json(this.formatResponse(this.successResponse(data.message, data)));
        } catch (error) {
            // Handle unexpected errors and return server error response
            return res.status(500).json(this.formatResponse(this.errorResponse(error.stack)));
        }
    }
}
