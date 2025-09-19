import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from '../../controller/v1/admin/admin.controller';
import { PartnerController } from 'src/controller/v1/partner/partner.controller';
import { PartnerService } from 'src/services/partner/partner.service';
import { AdminService } from '../../services/admin/admin.service';
import { Admin } from "../../entities/admin/admin.entity";
import { AuditLog } from "../../entities/auditLog.entity";
import { Partner } from "../../entities/partner/partner.entity"
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [TypeOrmModule.forFeature(
        [Admin, Partner, AuditLog]),  
    ConfigModule.forRoot(), // loads .env
   JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h', algorithm: 'HS256' },
      }),
    }),
    ],
    controllers: [AdminController, PartnerController],
    providers: [AdminService, PartnerService],
    exports: [AdminService, PartnerService], 
})
export class AdminModule { }
