import { Test, TestingModule } from '@nestjs/testing';
import { PostgresPersistentService } from './persistent.service';

describe('PersistentService', () => {
  let service: PostgresPersistentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostgresPersistentService],
    }).compile();

    service = module.get<PostgresPersistentService>(PostgresPersistentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
