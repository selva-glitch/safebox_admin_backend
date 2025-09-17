import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiTags,
  ApiQuery,
  ApiBearerAuth
} from '@nestjs/swagger';
import { AdminLoginDto } from '../validation/admin.validation';
import { LoginResponseType } from '../interfaces/admin.interface';
import {ListPartnersResponse} from '../interfaces/partner.interface'
import { ListParamsDto } from '../validation/partner.validation'

export function SwaggerAdminLogin() {
  return applyDecorators(
    ApiTags('Admin'),
    ApiOperation({ summary: 'Admin Login' }),
    ApiBody({ type: AdminLoginDto }), 
    ApiResponse({ status: 200, description: 'List of partners', type: LoginResponseType })
  );
}

export function SwaggerListPartners() {
  return applyDecorators(
    ApiTags('Partners'),
    ApiBearerAuth(),
    ApiQuery({ type: ListParamsDto }), 
    ApiOperation({ summary: 'List all partners' }),
    ApiResponse({ status: 200, description: 'List of partners', type: ListPartnersResponse }),
  );
}
