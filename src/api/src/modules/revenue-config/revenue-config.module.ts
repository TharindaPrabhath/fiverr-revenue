import { Module } from '@nestjs/common';
import { RevenueConfigService } from './revenue-config.service';
import { RevenueConfigController } from './revenue-config.controller';
import { RevenueConfig } from './entities/revenue-config.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RevenueConfig])],
  controllers: [RevenueConfigController],
  providers: [RevenueConfigService]
})
export class RevenueConfigModule {}
