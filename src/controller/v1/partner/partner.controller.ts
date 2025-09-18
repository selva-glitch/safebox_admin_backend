import { Controller, Body, Post, Req, Res, Get, UseGuards, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { PartnerService } from '../../../services/partner/partner.service';
import { ListParamsDto, GetPartnerDto,CreatePartnerDto } from '../../../validation/partner.validation'
import { SwaggerListPartners, SwaggerGetPartners , SwaggerAddPartner } from '../../../decorators/swagger.decorators'
import { CommonController } from '../../common.controller';
import { JwtAuthGuard } from '../../../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/v1/partners')
export class PartnerController extends CommonController {
  constructor(private readonly partnerService: PartnerService) {
    super()
  }


   /**
     * List the partners
     * 
     * @route GET /v1/partners/
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @returns {Promise<Response>} JSON response containing login status and data
     */
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
      const data = await this.partnerService.listPartners(params);
      // Return success response with login data
      return res.status(200).json(this.formatResponse(this.successResponse('Partner List Successfully', data)));
    } catch (error) {
      // Handle unexpected errors and return server error response
      return res.status(500).json(this.formatResponse(this.errorResponse(error.stack)));
    }
  }

  @Get(':id')
  @SwaggerGetPartners()
  async getPartner(@Param() param: GetPartnerDto, @Res() res: Response) {
    try {
      const [params, error, isError] = this.requestValidation(GetPartnerDto, 'Get', param);

      if (isError) {
        return res.status(400).json(this.formatResponse(this.validationErrorResponse(error)));
      }

      const data = await this.partnerService.getPartners(params);
      return res.status(data.code).json(this.formatResponse(this.successResponse(data.message, data)));
    } catch (error) {
      return res.status(500).json(this.formatResponse(this.errorResponse(error.stack)));
    }
  }

  @Post()
  @SwaggerAddPartner()
  async createPartner(@Req() req: Request, @Res() res: Response){
    try {
      const [params, error, isError] = this.requestValidation(CreatePartnerDto, 'Post', req['context'].body);

      if (isError) {
        return res.status(400).json(this.formatResponse(this.validationErrorResponse(error)));
      }

      const data = await this.partnerService.createPartner(params);
      return res.status(data.code).json(this.formatResponse(this.successResponse(data.message, data)));
    } catch (error) {
      return res.status(500).json(this.formatResponse(this.errorResponse(error.stack)));
    }
  }
}


