import { Test, TestingModule } from '@nestjs/testing';
import { CheckpointService } from './checkpoint.service';
import { LiquityService } from 'nimbora-liquity/liquity.service';
import { YieldDexService } from 'nimbora-yieldDex/yield-dex.service';
import { ConfigService } from 'common/config';

describe('CheckpointService', () => {
  let service: CheckpointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckpointService, ConfigService, LiquityService, YieldDexService],
    }).compile();

    service = module.get<CheckpointService>(CheckpointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
