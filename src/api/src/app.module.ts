import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RevenueStreamModule } from "./modules/revenue-stream/revenue-stream.module";
import { AppController } from "./app.controller";
import { ThrottlerModule } from "@nestjs/throttler";
import { RevenueConfigModule } from "./modules/revenue-config/revenue-config.module";
import { CommonModule } from "@common/common.module";
import { ConfigModule } from "@config/config.module";
import { DatabaseModule } from "@config/database/database.module";
import { RevenueConfig } from "@modules/revenue-config/entities/revenue-config.entity";
import { RevenueStream } from "@modules/revenue-stream/entities/revenue-stream.entity";
import { AuditLog } from "@modules/auditlog/entities/auditlog.entity";
import { RevenueConfigStream } from "@modules/revenue-config-stream/entities/revenue-config-stream.entity";

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20,
    }),
    RevenueConfigModule,
    RevenueStreamModule,
    //    DatabaseModule,
    //    CommonModule,
    ConfigModule.register(),
    TypeOrmModule.forFeature([
      RevenueConfig,
      RevenueStream,
      AuditLog,
      RevenueConfigStream,
    ]),
  ],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
