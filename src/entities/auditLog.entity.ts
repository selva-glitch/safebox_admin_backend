import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  partnerId: number;

  @Column()
  action: string;

  @Column('json')
  changes: any;

  @CreateDateColumn()
  createdAt: Date;
}
