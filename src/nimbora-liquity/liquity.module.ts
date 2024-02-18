import { Module } from '@nestjs/common';
import { LiquityService } from './liquity.service';

@Module({
  providers: [LiquityService],
  exports: [LiquityService],
})
export class LiquityModule {}
