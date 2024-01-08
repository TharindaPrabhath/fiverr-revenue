import { DynamicModule, Module, Global } from "@nestjs/common";
import { DatabaseModule } from "src/config/database/database.module";
import { AWSModule } from "src/config/aws/aws.module";
import { CryptoModule } from "src/config/crypto/crypto.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseService } from "./database/database.service";
import { ConfigService } from "./config.service";
import { CognitoModule } from "./cognito/cognito.module";
import { HttpModule } from "@nestjs/axios";

export interface ConfigModuleOptions {
  folder: string;
}

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 100000,
        maxRedirects: 5,
      }),
    }),
    AWSModule.register(),
    DatabaseModule.register(),
    CognitoModule.register(),
    CryptoModule.register()
  ],
})
export class ConfigModule {
  static register(): DynamicModule {
    return {
      module: ConfigModule,
      providers: [ConfigService],
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [DatabaseModule.register()],
          useFactory: (dbService: DatabaseService) => dbService.getORMConfig(),
          inject: [DatabaseService],
        })
      ],
      exports: [ConfigService],
    };
  }
}
