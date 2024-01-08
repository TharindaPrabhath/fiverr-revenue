import { DynamicModule, Module } from '@nestjs/common';
import { AWSModule } from 'src/config/aws/aws.module';
import { DatabaseService } from './database.service';
import { CryptoModule } from 'src/config/crypto/crypto.module';

@Module({
  imports: [AWSModule.register(), CryptoModule.register()],
})
export class DatabaseModule {
  static register(): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [DatabaseService],
      exports: [DatabaseService],
    };
  }
}