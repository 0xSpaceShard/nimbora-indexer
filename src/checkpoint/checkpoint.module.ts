import { Module } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { LiquityModule } from 'nimbora-liquity/liquity.module';
import { YieldDexModule } from 'nimbora-yieldDex/yield-dex.module';

@Module({
  imports: [LiquityModule, YieldDexModule],
  exports: [CheckpointService],
  providers: [CheckpointService],
})
export class CheckpointModule {}
