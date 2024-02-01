import { Injectable } from "@nestjs/common";
import { Database } from "src/config/interfaces";
import { AWSService } from "src/config/aws/aws.service";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AuditLog } from "@modules/auditlog/entities/auditlog.entity";
import { RevenueConfig } from "@modules/revenue-config/entities/revenue-config.entity";
import { RevenueStream } from "@modules/revenue-stream/entities/revenue-stream.entity";
import { RevenueConfigStream } from "@modules/revenue-config-stream/entities/revenue-config-stream.entity";
//import { CryptoService } from "src/config/crypto/crypto.service";

@Injectable()
export class DatabaseService {
  private connection: Database;
  private cryptoService: any;

  constructor() {
    //constructor(awsService: AWSService, cryptoService: CryptoService) {
    //constructor(awsService: AWSService) {
    //  this.connection = awsService.getDBValue();
    //this.cryptoService = cryptoService;
  }

  getORMConfig(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      // host: '127.0.0.1',//this.getConnection().host,
      // port: 3306,//this.getConnection().port,
      // username: 'bc_db',//this.getConnection().username,
      // password: 'bc_db123',//this.getConnection().password,
      // database: 'billingconfig_db',//this.getConnection().database,
      // entities: [__dirname + "./../../modules/**/entities/*.entity{.ts,.js}"],
      entities: [AuditLog, RevenueConfig, RevenueStream, RevenueConfigStream],
      url: `mysql://root:qwerty@127.0.0.1:3307/revenue`,
      // We are using migrations, synchronize should be set to false.
      synchronize: false,

      // Run migrations automatically,
      // you can disable this if you prefer running migration manually.
      migrationsRun: true,
      logging: false,
      debug: false,
      logger: "file",
      timezone: "+0",

      // Allow both start:prod and start:dev to use migrations
      // __dirname is either dist or src folder, meaning either
      // the compiled js in prod or the ts in dev.
      // migrations: [__dirname + "./../../migrations/**/*{.ts,.js}"],

      // cli: {
      //   // Location of migration should be inside src folder
      //   // to be compiled into dist/ folder.
      //   migrationsDir: "./../../migrations",
      // },
    };
  }

  getConnection(): Database {
    return this.connection["writer"];
  }

  getReadOnluConnection() {
    return;
  }
}
