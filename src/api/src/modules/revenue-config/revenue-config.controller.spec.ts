import { Test, TestingModule } from '@nestjs/testing';
import { RevenueConfigController } from './revenue-config.controller';
import { RevenueConfigService } from './revenue-config.service';

describe('RevenueConfigController', () => {
  let controller: RevenueConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RevenueConfigController],
      providers: [RevenueConfigService],
    }).compile();

    controller = module.get<RevenueConfigController>(RevenueConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
