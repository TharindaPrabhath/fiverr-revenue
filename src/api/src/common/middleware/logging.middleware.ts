import {
  Injectable,
  NestMiddleware,
  Scope,
  Logger,
  HttpException,
} from "@nestjs/common";
import { LoggerService } from "./logger.service";
import { v4 } from "uuid";
import { CreateAuditlogDto } from "@modules/auditlog/dto/create-auditlog.dto";
import { AuditlogService } from "@modules/auditlog/auditlog.service";
import { AuditLog } from "@modules/auditlog/entities/auditlog.entity";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private auditLogId: string;

  constructor(
    private logger: LoggerService,
    private readonly auditLogService: AuditlogService
  ) {
    this.logger = new Logger("LoggingMiddleware");
  }

  async use(req: any, res: any, next: () => void) {
    this.auditLogId = v4().slice(0, -4);
    req.headers.requestId = this.auditLogId;

    this.logger.log(`/ ${req.method.toUpperCase()} ${req.baseUrl}${req.path}`);
    this.logger.log(
      `Request: ${this.auditLogId}: ${req.protocol}://${req.hostname}${req.originalUrl}`
    );

    if (Object.keys(req.body).length !== 0) {
      this.logger.debug(
        `Logging request with requestId: ${this.auditLogId} to auditlog table.`
      );

      const auditLogData = this.createAuditLogPayload(req);

      let auditLogEntry: AuditLog;

      try {
        auditLogEntry = await this.auditLogService.insert(auditLogData);
      } catch (err) {
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
    } else {
      this.logger.debug(
        `Not Logging request with requestId: ${this.auditLogId} to auditlog table.`
      );
    }

    console.time(
      `Request: ${this.auditLogId}: ${req.protocol}://${req.hostname}${req.originalUrl}`
    );
    res.on("finish", () => {
      this.logger.log(
        console.timeEnd(
          `Request: ${this.auditLogId}: ${req.protocol}://${req.hostname}${req.originalUrl}`
        )
      );
      if (res.statusCode < 400)
        this.logger.log(
          `${this.auditLogId}: ${res.statusCode} ${req.method.toUpperCase()} ${req.baseUrl
          }${req.path}`
        );
      else
        this.logger.error(
          `${this.auditLogId}: ${res.statusCode} ${req.method.toUpperCase()} ${req.baseUrl
          }${req.path}`
        );
    });
    next();
  }

  createAuditLogPayload(req: any): CreateAuditlogDto {
    return {
      requestId: this.auditLogId,
      body: JSON.stringify(req.body),
      headers: JSON.stringify(req.headers),
      url: req.originalUrl,
    };
  }
}
