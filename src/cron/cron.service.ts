import { Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { YieldDexService } from 'yieldDex/yield-dex.service';

@Injectable()
export class CronService {
  constructor(readonly YieldDexService: YieldDexService) {}

  @Timeout(5000)
  async startYieldDexIndexer() {
    await this.YieldDexService.start();
  }
}
