import { Global, Module } from '@nestjs/common';
import { PrometheusModule as PrometheusModuleSource } from '@willsoto/nestjs-prometheus';
import { PrometheusService } from './prometheus.service';
import { Controller } from '@nestjs/common';

@Controller()
export class CustomMetricsControllerController {}

@Global()
@Module({
  imports: [
    PrometheusModuleSource.register({
      controller: CustomMetricsControllerController,
      defaultMetrics: { enabled: false },
    }),
  ],
  providers: [PrometheusService],
  exports: [PrometheusService],
})
export class PrometheusModule {}
