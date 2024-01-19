import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RevenueStreamModule } from './modules/revenue-stream/revenue-stream.module';
import { AppController } from "./app.controller";
import { ThrottlerModule } from "@nestjs/throttler";
import { RevenueConfigModule } from './modules/revenue-config/revenue-config.module';
import { CommonModule} from '@common/common.module';
import { ConfigModule } from "@config/config.module";
import { DatabaseModule } from "@config/database/database.module";


@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20
    }),
    RevenueConfigModule,
    RevenueStreamModule,
//    DatabaseModule,
//    CommonModule,
    ConfigModule.register()
  ],
  providers: [],
  controllers: [AppController]
})

export class AppModule { }
