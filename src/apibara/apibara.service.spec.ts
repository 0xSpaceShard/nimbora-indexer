import { Test, TestingModule } from '@nestjs/testing';
import { ApibaraService } from './apibara.service';

describe('ApibaraService', () => {
  let service: ApibaraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApibaraService],
    }).compile();

    service = module.get<ApibaraService>(ApibaraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
