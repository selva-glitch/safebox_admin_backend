import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../../entities/admin/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseType } from '../../interfaces/admin.interface';

@Injectable()
export class AdminService {
  
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>, // TypeORM repository for Admin entity
    private readonly jwtService: JwtService,    // Service for signing JWT tokens
  ) {}

  /**
   * Validates admin login credentials and generates a JWT token if valid.
   *
   * @param email - Admin email
   * @param password - Admin password
   * @returns {Promise<LoginResponseType>} Login response with status, message, and token (if successful)
   */
  async validateAdminLogin(email: string, password: string): Promise<LoginResponseType> {
    // Find admin by email
    const admin = await this.adminRepository.findOne({ where: { email , isActive: true } });

    // If user not found or password mismatch, return error response
    if (!admin || !(await admin.comparePassword(password))) {
      return {
        status: false,
        message: 'Invalid credentials',
        error: true,
        code: 401,
      };
    }

    // Prepare JWT payload
    const payload = { sub: admin.id, email: admin.email, role: admin.role };

    // Generate signed JWT
    const token = this.jwtService.sign(payload);

    // Return success response
    return {
      status: true,
      code: 200,
      message: "Login Successfully",
      error: false,
      data: {
        id: admin.id,
        name: admin.name,
        token,
      },
    };
  }
}
