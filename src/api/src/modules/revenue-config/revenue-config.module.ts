import { Module } from "@nestjs/common";
import { RevenueConfigService } from "./revenue-config.service";
import { RevenueConfigController } from "./revenue-config.controller";
import { RevenueConfig } from "./entities/revenue-config.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RevenueStream } from "@modules/revenue-stream/entities/revenue-stream.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RevenueConfig, RevenueStream])],
  controllers: [RevenueConfigController],
  providers: [RevenueConfigService],
})
export class RevenueConfigModule {}
