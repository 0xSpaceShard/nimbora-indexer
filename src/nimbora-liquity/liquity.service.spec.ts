import { Test, TestingModule } from '@nestjs/testing';
import { LiquityService } from './liquity.service';
import { ConfigService } from 'common/config';

describe('LiquityService', () => {
  let service: LiquityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiquityService, ConfigService],
    }).compile();

    service = module.get<LiquityService>(LiquityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
