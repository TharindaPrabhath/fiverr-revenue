import { Injectable } from "@nestjs/common";
import { Database } from "src/config/interfaces";
import { AWSService } from "src/config/aws/aws.service";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { CryptoService } from "src/config/crypto/crypto.service";

@Injectable()
export class DatabaseService {
  private connection: Database;
  private cryptoService: any;

  constructor(awsService: AWSService, cryptoService: CryptoService) {
    this.connection = awsService.getDBValue();
    this.cryptoService = cryptoService;
  }

  getORMConfig(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      host: this.getConnection().host,
      port: this.getConnection().port,
      username: this.getConnection().username,
      password: this.getConnection().password,
      database: this.getConnection().database,
      entities: [__dirname + "./../../modules/**/entities/*.entity{.ts,.js}"],

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
      migrations: [__dirname + "./../../migrations/**/*{.ts,.js}"],

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
