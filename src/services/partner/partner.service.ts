import { Injectable, ConflictException, InternalServerErrorException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { Partner } from '../../entities/partner/partner.entity';
import { ListParamsDto, GetPartnerDto, CreatePartnerDto } from '../../validation/partner.validation';
import {ListPartners, GetPartnerResponse, AddPartnerResponse, PartnerResponse} from '../../interfaces/partner.interface'
import {PartnerMapper} from '../../mappers/partner.mapper'



@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepo: Repository<Partner>,
  ) { }

  async create(data: Partial<Partner>) {
    const partner = this.partnerRepo.create(data);
    return this.partnerRepo.save(partner);
  }

  async findByEmail(email: string) {
    return this.partnerRepo.findOne({ where: { email } });
  }

  async validatePassword(email: string, password: string): Promise<boolean> {
    const partner = await this.findByEmail(email);
    return partner?.comparePassword(password) ?? false;
  }

  async listPartners(query: ListParamsDto): Promise<ListPartners> {

    let { page, limit, search, role, status } = query;
    page = parseInt((page ?? '1') as string) || 1;
    limit = parseInt((limit ?? '10') as string) || 10;

    const where: FindOptionsWhere<Partner>[] = [];

    if (search) {
      const like = Like(`%${search}%`);
      where.push({ name: like }, { company: like }, { email: like }, { partnerId: like });
    }

    const filters: FindOptionsWhere<Partner> = {};
    if (role) filters.role = role;
    if (status) filters.status = status;

    const finalWhere = where.length ? where.map(w => ({ ...w, ...filters })) : [filters];

    const [partners, total] = await this.partnerRepo.findAndCount({
      where: finalWhere,
      order: { createdAt: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    });
    const partnerResponses = PartnerMapper.toResponseList(partners);
    return {
      partners : partnerResponses,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    };
  }


  async getPartners(query:GetPartnerDto): Promise<GetPartnerResponse> {
    let {id} = query
    //id = parseInt((id ?? '0') as string) || 0;
    const partner = await this.partnerRepo.findOne({ where: { id } });
      if (!partner) {
        return{status: false,message: 'Partner not found',error: true,code: 404};
      }
      return {status: true,message: 'Partner details',error: false,code: 200, data:partner};
  }

  async createPartner(dto: CreatePartnerDto): Promise<AddPartnerResponse> {
    const existingPartner = await this.partnerRepo.findOne({
      where: [{ email: dto.email }, { phone: dto.phone }],
    });

    if (existingPartner) {
      if (existingPartner.email === dto.email) {
        return{status: false,message: 'Partner with this email already exists',error: true,code: 409};
      }
      if (existingPartner.phone === dto.phone) {
        return{status: false,message: 'Partner with this phone already exists',error: true,code: 409};
      }
    }

    const partnerData = this.partnerRepo.create(dto);

    if (dto.role === 'Bulk Buyer' || dto.role === 'Both') {
      partnerData.bulkLicense = {
        premiumTotal: 0,
        premiumUsed: 0,
        goldTotal: 0,
        goldUsed: 0,
      };
    }

    if (dto.role === 'Reseller' || dto.role === 'Both') {
      partnerData.resellPolicy = {
        premium: { base: 499,  discountedBands: [] },
        gold: { base: 1199,  discountedBands: [] },
      };
    }
    const partnerDetails = await this.partnerRepo.save(partnerData);
    const partnerResponse: PartnerResponse = PartnerMapper.toResponse(partnerDetails);
    return{status: true,message: 'Partner created successfully',error: false,code: 200, data :partnerResponse };
  }
}
