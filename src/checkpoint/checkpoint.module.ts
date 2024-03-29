import { Module } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { LiquityModule } from 'nimbora-liquity/liquity.module';
import { YieldDexModule } from 'nimbora-yieldDex/yield-dex.module';
import { ConfigModule } from 'common/config';

@Module({
  imports: [LiquityModule, YieldDexModule, ConfigModule],
  exports: [CheckpointService],
  providers: [CheckpointService],
})
export class CheckpointModule {}
