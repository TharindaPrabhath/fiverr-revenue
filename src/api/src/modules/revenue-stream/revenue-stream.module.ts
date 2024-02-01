import { Global, Module } from "@nestjs/common";
import { RevenueStreamService } from "./revenue-stream.service";
import { RevenueStreamController } from "./revenue-stream.controller";

@Global()
@Module({
  controllers: [RevenueStreamController],
  providers: [RevenueStreamService],
})
export class RevenueStreamModule {}
