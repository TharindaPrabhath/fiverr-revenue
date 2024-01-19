import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Database, Client } from "./interfaces";
import { DatabaseService } from "src/config/database/database.service";
import { InjectRepository, TypeOrmModuleOptions } from "@nestjs/typeorm";
//import { CryptoService } from "src/config/crypto/crypto.service";
import { LoggerService } from "@common/middleware/logger.service";
import { AWSService } from "./aws/aws.service";
import {
  Any,
  Between,
  Equal,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Repository,
} from "typeorm";
//import { CognitoService } from "./cognito/cognito.service";
import { SecureHeaders } from "./interfaces/secureheaders.interface";

@Injectable()
export class ConfigService {
  private readonly dbConnection: Database;
  private readonly readOnlyDBConnection: Database;
  private readonly ormConfig: TypeOrmModuleOptions;
  private readonly readOnlyORMConfig: TypeOrmModuleOptions;

  constructor(
    databaseService: DatabaseService,
//    private cognitoService: CognitoService,
//    private cryptoService: CryptoService,
    private logger: LoggerService,
    private awsService: AWSService,
    
  ) {
    this.logger = new Logger("ConfigService");
    //this.dbConnection = databaseService.getConnection();
    this.ormConfig = databaseService.getORMConfig();
    
  }

  // getCognitoService() {
  //   return this.cognitoService;
  // }

  getReadOnlyDBConnection(): Database {
    return this.readOnlyDBConnection;
  }

  getReadOnlyORMConfig(): TypeOrmModuleOptions {
    return this.readOnlyORMConfig;
  }


  getEnv(): string {
    return process.env.NODE_ENV;
  }

  getAppEnv(): string {
    return process.env.APP_ENV;
  }


  isProd(): boolean {
    return this.getEnv() === "Prod";
  }

  getDBConnection(): Database {
    return this.dbConnection;
  }

  getORMConfig(): TypeOrmModuleOptions {
    return this.ormConfig;
  }

  

  // getClientByName(name: string): Client {
  //   return this.cognitoService.getClientByName(name);
  // }

  getSecretValue(key: string): string {
    return this.awsService.getSecretValue(key);
  }

  // async getCognitoTokenByClient(
  //   clientName: string,
  //   grantType: string = "client_credentials",
  //   scope: string = "admin/app:admin"
  // ) {
  //   const client = this.getClientByName(clientName);
  //   return this.getCognitoToken(client, grantType, scope);
  // }

  // async getCognitoToken(
  //   clientDetails: Client,
  //   grantType: string = "client_credentials",
  //   scope: string = "admin/app:admin"
  // ): Promise<any> {
  //   return this.cognitoService.getCognitoToken(clientDetails, grantType, scope);
  // }

  // encryptRequest(data: string) {
  //   return this.cryptoService.encryptHMAC(data);
  // }

  // encrypt(data: string) {
  //   return this.cryptoService.encrypt(data);
  // }

  // decrypt(data: string) {
  //   return this.cryptoService.decrypt(data);
  // }

  getAPIEndpoint(serviceName: string) {
    return this.awsService.getAPIEndpoints()[serviceName];
  }

  getSecureHeaders(serviceName: string) {
    if (!this.awsService.getSecureHeaders()) {
      return undefined;
    }
    let secHeaderObjs = this.awsService.getSecureHeaders()[serviceName]
    if (!secHeaderObjs) {
      return undefined;
    }
    let secureHeaders = new Map(secHeaderObjs.map(obj => {
      return [obj.name, obj.value];
    }),);

    return Object.fromEntries(secureHeaders);;
  }
  

  getComparisonMethod(type: string) {
    if (!type) return null;

    let comparisonMethod: Function;

    switch (type.toLowerCase()) {
      case "isnull":
        comparisonMethod = IsNull;
        break;
      case "equal":
        comparisonMethod = Equal;
        break;
      case "like":
        comparisonMethod = Like;
        break;
      case "ilike":
        comparisonMethod = ILike;
        break;
      case "between":
        comparisonMethod = Between;
        break;
      case "any":
        comparisonMethod = Any;
        break;
      case "in":
        comparisonMethod = In;
        break;
      case "not":
        comparisonMethod = Not;
        break;
      case "lessthan":
        comparisonMethod = LessThan;
        break;
      case "lessthanorequal":
        comparisonMethod = LessThanOrEqual;
        break;
      case "morethanorequal":
        comparisonMethod = MoreThanOrEqual;
        break;
      case "morethan":
        comparisonMethod = MoreThan;
        break;
    }

    return comparisonMethod;
  }

  getComparisonString(type: string) {
    if (!type) return null;

    let comparison: string;

    switch (type.toLowerCase()) {
      case "select":
        comparison = "=";
        break;
      case "isnull":
        comparison = "IsNull";
        break;
      case "equal":
        comparison = "Equal";
        break;
      case "like":
        comparison = "Like";
        break;
      case "ilike":
        comparison = "ILike";
        break;
      case "between":
        comparison = "Between";
        break;
      case "any":
        comparison = "Any";
        break;
      case "in":
        comparison = "In";
        break;
      case "not":
        comparison = "Not";
        break;
      case "lessthan":
        comparison = "LessThan";
        break;
      case "lessthanorequal":
        comparison = "LessThanOrEqual";
        break;
      case "morethanorequal":
        comparison = "MoreThanOrEqual";
        break;
      case "morethan":
        comparison = "MoreThan";
        break;
    }

    return ` ${comparison} `;
  }
}
