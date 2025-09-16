import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,Like, FindOptionsWhere  } from 'typeorm';
import { Partner } from '../../entities/partner/partner.entity';
import{ListParamsType} from '../../interfaces/partner.interface'

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepo: Repository<Partner>,
  ) {}

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

   async listPartners({ page, limit, search, role, status }: ListParamsType) {
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

    return {
      partners,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    };
  }
}
