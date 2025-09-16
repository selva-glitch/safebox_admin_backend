import { Controller, HttpCode, Post, Body, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AdminService } from '../../../services/admin/admin.service';
import { AdminLoginDto } from '../../../validation/admin.validation';
import { CommonController } from '../../common.controller';

@Controller('v1/admin')
export class AdminController extends CommonController {
    constructor(
        private readonly adminService: AdminService,
    ) {
        super();
    }

    @Post('/login')
    @HttpCode(200)
    async adminLogin(@Req() req: Request, @Res() res: Response) 
    {
        try {
            const [params, error, isError] = this.requestValidation(AdminLoginDto, 'Post', req['context'].body);
            if (isError) {
                return res.status(400).json(this.formatResponse(this.validationErrorResponse(error)));
            }
            const data = await this.adminService.validateAdminLogin(params.email, params.password);
            return res.status(200).json(this.formatResponse(this.successResponse("Login Successfully", data)));
        } catch (error) {
             return res.status(500).json(this.formatResponse(this.errorResponse(error.stack)));
        }
    }

}
