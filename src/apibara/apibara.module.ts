import { Module } from '@nestjs/common';
import { ApibaraService } from './apibara.service';
import { Logger } from 'winston';
import { ConfigModule } from '@nestjs/config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { PrismaModule } from 'prisma/prisma.module';
import { PersistentModule } from 'persistent/persistent.module';

@Module({
  imports: [Logger, ConfigModule, PrometheusModule, PrismaModule, PersistentModule],
  exports: [ApibaraService],
})
export class ApibaraModule {}
