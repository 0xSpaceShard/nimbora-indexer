import { Logger, Module } from '@nestjs/common';
import { LiquityService } from './liquity.service';
import { PrismaModule } from 'prisma/prisma.module';
import { PrometheusModule } from 'common/prometheus';
import { ConfigModule } from 'common/config';
import { ApibaraModule } from 'apibara/apibara.module';
import { PersistentModule } from 'persistent/persistent.module';

@Module({
  imports: [PrismaModule, PrometheusModule, ConfigModule, PersistentModule],
  providers: [LiquityService],
  exports: [LiquityService],
})
export class LiquityModule {}
