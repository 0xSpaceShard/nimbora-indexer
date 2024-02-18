import { Module } from '@nestjs/common';
import { YieldDexService } from './yield-dex.service';

@Module({
  exports: [YieldDexService],
  providers: [YieldDexService],
})
export class YieldDexModule {}
