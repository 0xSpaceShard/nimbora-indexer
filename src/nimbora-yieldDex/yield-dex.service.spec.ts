import { Test, TestingModule } from '@nestjs/testing';
import { YieldDexService } from './yield-dex.service';
import { ConfigService } from 'common/config';

describe('YieldDexService', () => {
  let service: YieldDexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YieldDexService, ConfigService],
    }).compile();

    service = module.get<YieldDexService>(YieldDexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
