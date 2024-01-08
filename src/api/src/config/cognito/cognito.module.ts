import { DynamicModule, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios"
import { CognitoService } from "./cognito.service";
import { AWSModule } from "@config/aws/aws.module";

@Module({
  imports: [
    AWSModule.register(),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 100000,
        maxRedirects: 5,
      }),
    }),
  ],
})
export class CognitoModule {
  static register(): DynamicModule {
    return {
      module: CognitoModule,
      providers: [CognitoService],
      exports: [CognitoService],
    };
  }
}
