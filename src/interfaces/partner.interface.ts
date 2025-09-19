import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Partner } from '../entities/partner/partner.entity';


class BulkLicenseResponse {
  @ApiProperty() premiumTotal: number;
  @ApiProperty() premiumUsed: number;
  @ApiProperty() goldTotal: number;
  @ApiProperty() goldUsed: number;
}

class PolicyResponse {
  @ApiProperty() base: number;

  @ApiProperty({ type: [Number] })
  discountedBands: number[];
}

class ResellPolicyResponse {
  @ApiProperty({ type: PolicyResponse })
  premium: PolicyResponse;

  @ApiProperty({ type: PolicyResponse })
  gold: PolicyResponse;
}

class PricingConfigResponse {
  @ApiProperty() mrp: number;

  @ApiProperty({ type: [Number] })
  allowedDiscounts: number[];

  @ApiProperty() base: number;
}

class KPIsResponse {
  @ApiProperty() clientsAdded: number;
  @ApiProperty() linksGenerated: number;
  @ApiProperty() licensesSold: number;
  @ApiProperty() totalRevenue: number;
  @ApiProperty() giftedThisMonth: number;
  @ApiProperty() totalGifted: number;
}

export class PartnerResponse {
  @ApiProperty() id: number;
  @ApiProperty() name: string;
  @ApiProperty() company: string;
  @ApiProperty() email: string;
  @ApiProperty() phone: string;
  @ApiProperty() gst: string;
  @ApiProperty() role: string;
  @ApiProperty() status: string;

  @ApiProperty({ type: BulkLicenseResponse })
  bulkLicense: BulkLicenseResponse;

  @ApiProperty({ type: ResellPolicyResponse })
  resellPolicy: ResellPolicyResponse;

  @ApiProperty({ type: PricingConfigResponse })
  premiumPricing: PricingConfigResponse;

  @ApiProperty({ type: PricingConfigResponse })
  goldPricing: PricingConfigResponse;

  @ApiProperty({ type: KPIsResponse })
  kpis: KPIsResponse;

  @ApiProperty() partnerId: string;

  @ApiPropertyOptional() password: string;

  @ApiPropertyOptional() createdAt?: Date;
  @ApiPropertyOptional() updatedAt?: Date;
}


export class ListPartners {
   @ApiProperty({ type: [PartnerResponse] }) partners: PartnerResponse[];
   @ApiProperty() totalPages: number;
   @ApiProperty()currentPage: number;
  @ApiProperty() total: number;

};


export class ListPartnersResponse {
  @ApiProperty({ type: [ListPartners] }) data: ListPartners;
  @ApiProperty() status: boolean;
  @ApiProperty()message: string;
  @ApiProperty() error: boolean;
  @ApiProperty() code:number;
}


export class GetPartnerResponse {
  @ApiProperty({ type: [ListPartners] }) data?: PartnerResponse;
  @ApiProperty() status: boolean;
  @ApiProperty()message: string;
  @ApiProperty() error: boolean;
  @ApiProperty() code:number;
}


export class AddPartnerResponse {
  @ApiProperty({ type: [PartnerResponse] }) data?: PartnerResponse;
  @ApiProperty() status: boolean;
  @ApiProperty()message: string;
  @ApiProperty() error: boolean;
  @ApiProperty() code:number;
}



export class UpdateBulkLicenseResponse {
  @ApiProperty({ type: [BulkLicenseResponse] }) data?: BulkLicenseResponse;
  @ApiProperty() status: boolean;
  @ApiProperty()message: string;
  @ApiProperty() error: boolean;
  @ApiProperty() code:number;
}


export class UpdateResellPolicyResponse {
  @ApiProperty({ type: [ResellPolicyResponse] }) data?: ResellPolicyResponse;
  @ApiProperty() status: boolean;
  @ApiProperty()message: string;
  @ApiProperty() error: boolean;
  @ApiProperty() code:number;
}





