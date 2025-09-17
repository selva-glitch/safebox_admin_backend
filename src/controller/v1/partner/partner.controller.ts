import { Controller, HttpCode, Post, Req, Res, Get, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { PartnerService } from '../../../services/partner/partner.service';
import { ListParamsDto } from '../../../validation/partner.validation'
import { SwaggerListPartners } from '../../../decorators/swagger.decorators'
import { CommonController } from '../../common.controller';


@Controller('/v1/partners')
export class PartnerController extends CommonController {
  constructor(private readonly partnerService: PartnerService) {
    super()
  }

  @Get()
  @SwaggerListPartners()
  async listPartners(@Req() req: Request, @Res() res: Response) {
    // return this.partnerService.listPartners(query);

    try {
      // Validate request body using AdminLoginDto
      const [params, error, isError] = this.requestValidation(ListParamsDto, 'Get', req['context'].query);

      // If validation fails, return error response
      if (isError) {
        return res.status(400).json(this.formatResponse(this.validationErrorResponse(error)));
      }

      // Authenticate admin using email and password
      const data = await this.partnerService.listPartners(params);
      console.log(data)

      // Return success response with login data
      return res.status(200).json(this.formatResponse(this.successResponse('Partner List Successfully', data)));
    } catch (error) {
      // Handle unexpected errors and return server error response
      return res.status(500).json(this.formatResponse(this.errorResponse(error.stack)));
    }
  }
}


