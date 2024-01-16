import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { YieldDexModule } from 'yieldDex/yield-dex.module';

@Module({
  imports: [ScheduleModule.forRoot(), YieldDexModule],
  providers: [CronService],
})
export class CronModule {}
