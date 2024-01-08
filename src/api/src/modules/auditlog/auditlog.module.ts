import { Module } from "@nestjs/common";
import { AuditlogService } from "./auditlog.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuditLog } from "./entities/auditlog.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AuditLog])],
  providers: [AuditlogService],
  exports: [AuditlogService],
})
export class AuditlogModule { }
