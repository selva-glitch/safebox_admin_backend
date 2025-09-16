import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Admin } from '../../entities/admin/admin.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}


  async getAdmin() {
    return this.adminRepository.find({
      skip: (1 - 1) * 10,
      take: 10,
      order: { created_at: 'DESC' },
    });
  }

  async validateAdminLogin(email: string, password: string): Promise<any> {
    const admin = await this.adminRepository.findOne({ where: { email } });

    if (!admin || !(await admin.comparePassword(password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: admin.id, email: admin.email, role: admin.role };
    const token = this.jwtService.sign(payload);
    return {
        id: admin.id,
        name: admin.name,
        token: token,
      }
    }
}