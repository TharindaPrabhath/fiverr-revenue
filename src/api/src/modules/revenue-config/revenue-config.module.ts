import { Module } from '@nestjs/common';
import { RevenueConfigService } from './revenue-config.service';
import { RevenueConfigController } from './revenue-config.controller';

@Module({
  controllers: [RevenueConfigController],
  providers: [RevenueConfigService]
})
export class RevenueConfigModule {}
