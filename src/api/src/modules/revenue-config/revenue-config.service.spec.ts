import { Test, TestingModule } from '@nestjs/testing';
import { RevenueConfigService } from './revenue-config.service';

describe('RevenueConfigService', () => {
  let service: RevenueConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RevenueConfigService],
    }).compile();

    service = module.get<RevenueConfigService>(RevenueConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
