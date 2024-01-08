import { DynamicModule, Module } from "@nestjs/common";
import { AWS_SECRETS, AWS_SERVICES } from "src/config/constants";
import { AWSService } from "./aws.service";
import { AWSSDK } from "./aws.sdk";

@Module({})
export class AWSModule {
  static register(): DynamicModule {
    return {
      module: AWSModule,
      providers: [
        {
          provide: AWS_SECRETS,
          useFactory: async () => {
            let awsSecrets = await new AWSSDK().loadSecrets();
            return awsSecrets;
          },
        },
        {
          provide: AWS_SERVICES,
          useFactory: async () => {
            let awsServices = new AWSSDK();
            return awsServices;
          },
        },
       
        AWSService,
      ],
      exports: [AWSService],
    };
  }
}
