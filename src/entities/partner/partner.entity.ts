import {
  Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, BeforeInsert
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

class BulkLicense {
  @Column({ default: 0 }) premiumTotal: number;
  @Column({ default: 0 }) premiumUsed: number;
  @Column({ default: 0 }) goldTotal: number;
  @Column({ default: 0 }) goldUsed: number;
}

class ResellBand {
  @Column("simple-array") discountedBands: number[];
}

class ResellPolicy {
  @Column({ type: 'enum', enum: [499, 599], default: 499 }) base: number;
  @Column(type => ResellBand) bands: ResellBand;
}

class PricingConfig {
  @Column({ default: 999 }) mrp: number;
  @Column("simple-array") allowedDiscounts: number[];
  @Column({ default: 799 }) base: number;
}

class KPIs {
  @Column({ default: 0 }) clientsAdded: number;
  @Column({ default: 0 }) linksGenerated: number;
  @Column({ default: 0 }) licensesSold: number;
  @Column({ default: 0 }) totalRevenue: number;
  @Column({ default: 0 }) giftedThisMonth: number;
  @Column({ default: 0 }) totalGifted: number;
}

@Entity()
@Unique(['email'])
@Unique(['phone'])
export class Partner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() name: string;
  @Column() company: string;
  @Column() email: string;
  @Column() phone: string;
  @Column() gst: string;

  @Column({ type: 'enum', enum: ['Reseller', 'Bulk Buyer', 'Both'] })
  role: string;

  @Column({ type: 'enum', enum: ['Active', 'Suspended'], default: 'Active' })
  status: string;

  @Column(type => BulkLicense) bulkLicense: BulkLicense;
  @Column(type => ResellPolicy) resellPolicy: ResellPolicy;

  @Column(type => PricingConfig) premiumPricing: PricingConfig;
  @Column(type => PricingConfig) goldPricing: PricingConfig;

  @Column(type => KPIs) kpis: KPIs;

  @Column({ unique: true }) partnerId: string;

  @Column() password: string;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
    this.partnerId = this.partnerId || 'PRT' + Date.now().toString().slice(-8);
  }

  async comparePassword(candidate: string): Promise<boolean> {
    return bcrypt.compare(candidate, this.password);
  }
}
