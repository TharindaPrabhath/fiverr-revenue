import { Test, TestingModule } from '@nestjs/testing';
import { RevenueStreamController } from './revenue-stream.controller';
import { RevenueStreamService } from './revenue-stream.service';

describe('RevenueStreamController', () => {
  let controller: RevenueStreamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RevenueStreamController],
      providers: [RevenueStreamService],
    }).compile();

    controller = module.get<RevenueStreamController>(RevenueStreamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
