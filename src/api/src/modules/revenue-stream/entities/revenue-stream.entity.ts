import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { AbstractEntity } from "../../../config/database/abstract.entity";
import { RevenueConfig } from "@modules/revenue-config/entities/revenue-config.entity";
import { RevenueConfigStream } from "@modules/revenue-config-stream/entities/revenue-config-stream.entity";
@Entity()
export class RevenueStream extends AbstractEntity<RevenueStream> {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(
    () => RevenueConfigStream,
    (revenueConfigStreams) => revenueConfigStreams.revenueStream
  )
  revenueConfigStreams: RevenueConfigStream[];

  // @ManyToMany(() => RevenueConfig)
  // @JoinTable({
  //   name: "revenue_config_stream",
  // })
  // revenueConfigs: RevenueConfig[];
}
