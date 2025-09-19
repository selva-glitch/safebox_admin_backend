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
import {ListPartnersResponse, GetPartnerResponse, AddPartnerResponse, UpdateBulkLicenseResponse, UpdateResellPolicyResponse} from '../interfaces/partner.interface'
import { ListParamsDto, CreatePartnerDto, UpdateBulkLicenseDto, UpdateResellPolicyDto } from '../validation/partner.validation'


export function SwaggerAdminLogin() {
  return applyDecorators(
    ApiOperation({ summary: 'Admin Login' }),
    ApiBody({ type: AdminLoginDto }), 
    ApiResponse({ status: 200, description: 'List of partners', type: LoginResponseType })
  );
}

export function SwaggerListPartners() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiQuery({ type: ListParamsDto }), 
    ApiOperation({ summary: 'List all partners' }),
    ApiResponse({ status: 200, description: 'List of partners', type: ListPartnersResponse }),
  );
}


export function SwaggerGetPartners() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiOperation({ summary: 'Get Partners' }),
    ApiResponse({ status: 200, description: 'Get Partners', type: GetPartnerResponse }),
  );
}

export function SwaggerAddPartner(){
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiBody({ type: CreatePartnerDto }), 
    ApiOperation({ summary: 'Add Partners' }),
    ApiResponse({ status: 200, description: 'Get Partners', type: AddPartnerResponse }),
  );
}

export function SwaggerUpdateBulkLicense(){
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiBody({ type: UpdateBulkLicenseDto }), 
    ApiOperation({ summary: 'Update Bulk License' }),
    ApiResponse({ status: 200, description: 'Get Partners', type: UpdateBulkLicenseResponse }),
  );
}



export function SwaggerUpdateResellPolicy(){
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiBody({ type: UpdateResellPolicyDto }), 
    ApiOperation({ summary: 'Update Resell Policy' }),
    ApiResponse({ status: 200, description: 'Get Partners', type: UpdateResellPolicyResponse }),
  );
}


