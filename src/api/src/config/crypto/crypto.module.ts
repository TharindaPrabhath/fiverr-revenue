import { DynamicModule, Module } from "@nestjs/common";
import { AWSModule } from "src/config/aws/aws.module";
import { CryptoService } from "./crypto.service";

@Module({
  imports: [AWSModule.register()],
})
export class CryptoModule {
  static register(): DynamicModule {
    return {
      module: CryptoModule,
      providers: [CryptoService],
      exports: [CryptoService],
    };
  }
}
