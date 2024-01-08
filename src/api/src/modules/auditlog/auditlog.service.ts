import {
  Injectable,
  Inject,
  Request,
  Scope,
  HttpException,
  Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuditLog } from "./entities/auditlog.entity";
import { Repository } from "typeorm";
import { LoggerService } from "@common/middleware/logger.service";
import { REQUEST } from "@nestjs/core";
import { CreateAuditlogDto } from "./dto/create-auditlog.dto";

@Injectable({ scope: Scope.REQUEST })
export class AuditlogService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
    private readonly logger: LoggerService,
    @Inject(REQUEST) private readonly request?: Request
  ) {
    this.logger = new Logger("AuditLogService");
  }

  async insert(auditLog: CreateAuditlogDto): Promise<AuditLog> {
    const newAuditLog = this.auditLogRepository.create(auditLog);

    try {
      return await this.auditLogRepository.save(newAuditLog);
    } catch (err) {
      this.logger.error(
        "Error connecting Database while saving to AuditLog table"
      );
      this.logger.error(err);
      throw new HttpException(
        {
          code: "InternalServerError",
          description: "Database Connection time-out",
          solution: "Report the issue to EPS App team",
          source: "EPS",
        },
        500
      );
    }
  }

  getRequestId(): string {
    const headers = <any>this.request.headers;
    return headers.requestId.toString();
  }
}
