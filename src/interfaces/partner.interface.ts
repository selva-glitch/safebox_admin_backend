import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PartnerResponse {
  @ApiProperty() id: number;
  @ApiProperty() name: string;
  @ApiProperty() company: string;
  @ApiProperty() email: string;
  @ApiProperty() phone: string;
  @ApiProperty() gst: string;
  @ApiProperty() role: string;
  @ApiProperty() status: string;

  @ApiProperty()
  bulkLicense: {
    premiumTotal: number;
    premiumUsed: number;
    goldTotal: number;
    goldUsed: number;
  };

  @ApiProperty()
  resellPolicy: {
    base: number;
    bands: {
      discountedBands: any;
    };
  };

  @ApiProperty()
  premiumPricing: {
    mrp: number;
    allowedDiscounts: any;
    base: number;
  };

  @ApiProperty()
  goldPricing: {
    mrp: number;
    allowedDiscounts: any;
    base: number;
  };

  @ApiProperty()
  kpis: {
    clientsAdded: number;
    linksGenerated: number;
    licensesSold: number;
    totalRevenue: number;
    giftedThisMonth: number;
    totalGifted: number;
  };

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
};

