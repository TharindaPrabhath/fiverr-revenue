import { Inject, Injectable } from "@nestjs/common";
import {
  AWSSecrets,
  Clients,
  Database,
  Cognito,
  AWSJSONSecrets,
  Certs,
  APIEndpoints,
} from "src/config/interfaces";
import {
  AWS_CHATSESSION,
  AWS_SECRETS,
  AWS_SERVICES,
} from "src/config/constants";
import { SecureHeaders } from "@config/interfaces/secureheaders.interface";

@Injectable()
export class AWSService {
  private awsSecrets: AWSSecrets;
  private awsJSONSecrets: AWSJSONSecrets;
  // private awsChatConfig: any;
  private awsServices: any;

  constructor(
    @Inject(AWS_SECRETS) awsSecrets: any,
    @Inject(AWS_SERVICES) awsServices: any
    // @Inject(AWS_CHATSESSION) awsChatConfig: any
  ) {
    this.awsSecrets = awsSecrets;
    this.awsJSONSecrets = awsSecrets;
    // this.awsChatConfig = awsChatConfig;
    // console.log(this.awsChatConfig);
    this.awsServices = awsServices;
  }

  getEnv(): string {
    return process.env.NODE_ENV;
  }

  getUserInterfaceUrl() {
    const url = {
      local: "https://local.djfastpay.test/",
      dev: "https://cpp.payments-dev.dowjones.io/",
      stag: "https://cpp.payments-stag.dowjones.io/",
      prod: "https://djfastpay.com/",
    };

    return url[this.getEnv()];
  }

  getCognitoISP() {
    return this.awsServices.cognitoISP;
  }

  // getChatConfig() {
  //   return this.awsChatConfig;
  // }

  getAWSSecrets() {
    return this.awsSecrets;
  }

  getSecretValue(key: string): string {
    return this.awsSecrets[key];
  }

  getValue(key1: string, key2: string): object {
    return JSON.parse(this.getSecretValue(key1))[key2];
  }

  getClients(): Clients {
    return <Clients>this.getJSONSecretValue("clients");
  }

  getAPIEndpoints(): APIEndpoints {
    return <APIEndpoints>this.getJSONSecretValue("api_endpoints");
  }

  getDBValue(): Database {
    return <Database>this.getJSONSecretValue("database");
  }

  getCognitoValue(): Cognito {
    return <Cognito>this.getJSONSecretValue("cognito");
  }

  getSecureHeaders(): SecureHeaders {
    return <SecureHeaders>this.getJSONSecretValue("secure_headers");
  }

  getJSON(key: string): object {
    return JSON.parse(this.getSecretValue(key));
  }

  getJSONSecretValue(key: string): object {
    return this.awsJSONSecrets[key];
  }
}
