import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CheckpointModule } from 'checkpoint/checkpoint.module';

@Module({
  imports: [ScheduleModule.forRoot(), CheckpointModule],
  providers: [CronService],
})
export class CronModule {}
