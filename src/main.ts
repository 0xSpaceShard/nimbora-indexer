import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ConfigService } from 'common/config';
import { VersioningType } from '@nestjs/common';
import { AppModule } from 'app';
import { MetricsPrometheusModule } from 'common/prometheus/metrics.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));
  const metrics = await NestFactory.create<NestFastifyApplication>(MetricsPrometheusModule, new FastifyAdapter());

  const configService: ConfigService = app.get(ConfigService);
  const appPort = configService.get('INDEXER_PORT');
  const metricsPort = configService.get('METRICS_PORT');

  app.enableVersioning({ type: VersioningType.URI });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  metrics.listen(metricsPort, '0.0.0.0');
  await app.listen(appPort, '0.0.0.0');
}
bootstrap();
