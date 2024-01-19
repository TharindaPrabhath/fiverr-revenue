import { Module } from '@nestjs/common';
import { RevenueStreamService } from './revenue-stream.service';
import { RevenueStreamController } from './revenue-stream.controller';
import { RevenueStream } from './entities/revenue-stream.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RevenueStream])],
  controllers: [RevenueStreamController],
  providers: [RevenueStreamService]
})
export class RevenueStreamModule {}
