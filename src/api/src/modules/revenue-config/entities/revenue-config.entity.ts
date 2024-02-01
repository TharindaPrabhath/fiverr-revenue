import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import { AbstractEntity } from "../../../config/database/abstract.entity";
import { RevenueStream } from "@modules/revenue-stream/entities/revenue-stream.entity";
import { RevenueConfigStream } from "@modules/revenue-config-stream/entities/revenue-config-stream.entity";
@Entity()
export class RevenueConfig extends AbstractEntity<RevenueConfig> {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  audience: string;

  @Column()
  edition: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  @CreateDateColumn()
  creation_date: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  @UpdateDateColumn()
  modified_date: Date;

  @OneToMany(
    () => RevenueConfigStream,
    (revenueConfigStreams) => revenueConfigStreams.revenueConfig
  )
  revenueConfigStreams: RevenueConfigStream[];

  // @ManyToMany(() => RevenueStream)
  // @JoinTable({
  //   name: "revenue_config_stream",
  // })
  // revenueStreams: RevenueStream[];
}
