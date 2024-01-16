import { Module } from '@nestjs/common';
import { YieldDexService } from './yield-dex.service';
import { CheckpointModule } from 'checkpoint/checkpoint.module';

@Module({
  imports: [CheckpointModule],
  exports: [YieldDexService],
  providers: [YieldDexService],
})
export class YieldDexModule {}
