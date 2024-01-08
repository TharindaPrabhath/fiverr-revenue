import { BeforeUpdate, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('AuditLog')
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('request_id_idx')
  @Column({ length: 50 })
  request_id: string;

  @Column({ length: 50 })
  module_name: string;

  @Column('text')
  headers: string;

  @Column('text')
  body: string;

  @Column('text')
  url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = new Date();
  }
}