import { Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { CheckpointService } from 'checkpoint/checkpoint.service';

@Injectable()
export class CronService {
  constructor(readonly checkpointService: CheckpointService) {}

  @Timeout(5000)
  async startLiquityIndexer() {
    await this.checkpointService.start();
  }

  @Timeout(5000)
  async LastIndexedBlock() {
    await this.checkpointService.lastIndexedBlock();
  }

  @Timeout(5000)
  async currentStarknetBlock() {
    await this.checkpointService.currentStarknetBlock();
  }

  @Timeout(5000)
  async lastAcceptedBlockOnL1() {
    await this.checkpointService.lastAcceptedBlockOnL1();
  }
  
}
