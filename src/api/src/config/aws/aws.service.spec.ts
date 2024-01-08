import { Test, TestingModule } from "@nestjs/testing";
import { AWSService } from "./aws.service";
import { AWS_SECRETS } from "src/config/constants";

describe("AWSService", () => {
  let service: AWSService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AWSService, { provide: AWS_SECRETS, useValue: {} }],
    }).compile();

    service = module.get<AWSService>(AWSService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
