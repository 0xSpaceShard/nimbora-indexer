import { Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { CheckpointService } from 'checkpoint/checkpoint.service';

@Injectable()
export class CronService {
  constructor(readonly checkpointService: CheckpointService) {}

  @Timeout(5000)
  async startLiquityIndexer() {
    // await this.checkpointService.start();
  }
}
