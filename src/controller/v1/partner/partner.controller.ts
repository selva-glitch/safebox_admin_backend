import { Controller, Post, Body, Get, Param , Query} from '@nestjs/common';
import { PartnerService } from '../../../services/partner/partner.service';
import { Partner } from '../../../entities/partner/partner.entity';

@Controller('/v1/partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post()
  async create(@Body() body: Partial<Partner>) {
    return this.partnerService.create(body);
  }

  @Get(':email')
  async getByEmail(@Param('email') email: string) {
    return this.partnerService.findByEmail(email);
  }

  @Get()
  async listPartners(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
    @Query('role') role?: string,
    @Query('status') status?: string,
  ) {
    return this.partnerService.listPartners({ page, limit, search, role, status });
  }
}
