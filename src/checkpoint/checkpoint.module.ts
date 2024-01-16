import { Module } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';

@Module({
  exports: [CheckpointService],
  providers: [CheckpointService],
})
export class CheckpointModule {}
