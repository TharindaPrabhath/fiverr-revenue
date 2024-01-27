import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToOne,
  UpdateDateColumn,
} from "typeorm";
import { AbstractEntity } from "../../../config/database/abstract.entity";
import { RevenueConfig } from "@modules/revenue-config/entities/revenue-config.entity";
import { RevenueStream } from "@modules/revenue-stream/entities/revenue-stream.entity";

@Entity("revenue_config_stream")
export class RevenueConfigStream extends AbstractEntity<RevenueConfigStream> {
  @Column()
  revsharepct: string;

  @Column()
  chargetemplateid: string;

  @Column()
  taxcode: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  @CreateDateColumn()
  creation_date: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  @UpdateDateColumn()
  modified_date: Date;

  @OneToOne(() => RevenueConfig)
  @JoinTable()
  revenueConfig: RevenueConfig;

  @OneToOne(() => RevenueStream)
  @JoinTable()
  revenueStream: RevenueStream;
}
