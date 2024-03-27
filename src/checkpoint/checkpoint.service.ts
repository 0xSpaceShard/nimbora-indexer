import { Inject, Injectable, LoggerService } from '@nestjs/common';
import Checkpoint, { CheckpointConfig, LogLevel } from '@snapshot-labs/checkpoint';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from 'common/config';
import { Service } from 'types/service';
import { LiquityService } from 'nimbora-liquity/liquity.service';
import { YieldDexService } from 'nimbora-yieldDex/yield-dex.service';
import { serviceStatusPerNetwork } from 'config/checkpoint';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class CheckpointService {
  checkpoint: Checkpoint;

  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    readonly configService: ConfigService,
    readonly liquityService: LiquityService,
    readonly ydService: YieldDexService,
  ) {}

  async start() {
    const schemaFile = path.join(process.cwd(), 'src/schema/checkpoint/schema.gql');
    const schema = fs.readFileSync(schemaFile, 'utf8');

    let writers = {};
    let templates = {};
    const sources = [];
    const services = [];

    if (serviceStatusPerNetwork[this.configService.get('NETWORK')].liquity) {
      services.push(this.liquityService);
    }

    if (serviceStatusPerNetwork[this.configService.get('NETWORK')].yieldDex) {
      services.push(this.ydService);
    }

    if (services.length === 0) {
      return;
    }

    for (let i = 0; i < services.length; i++) {
      const service: Service = services[i];
      writers = { ...writers, ...service.writers() };
      const { sources: src, templates: template } = service.config();
      sources.push(...src);
      if (templates) {
        templates = { ...templates, ...template };
      }
    }

    const config: CheckpointConfig = {
      network_node_url: this.configService.get('L2_ALCHEMY_RPC_URL'),
      sources,
      templates,
    };

    this.checkpoint = new Checkpoint(config, writers, schema, {
      logLevel: LogLevel.Info,
      prettifyLogs: true,
      dbConnection: this.configService.get('DATABASE_URL') + '/' + this.configService.get('DATABASE_NAME'),
      fetchInterval: 90000,
    });

    if (this.configService.get('DATABASE_RESET_METADATA')) {
      this.logger.log('Reset checkpoint metadata');
      await this.checkpoint.resetMetadata();
    }

    if (this.configService.get('DATABASE_RESET')) {
      this.logger.log('Reset checkpoint database');
      await this.checkpoint.reset();
      if (this.liquityService.seed().length > 0) {
        await this.checkpoint.seedCheckpoints(this.liquityService.seed());
      }
    }

    while (true) {
      try {
        await this.checkpoint.start();
      } catch (error) {
        this.logger.warn('Error during indexing', { error });
        await this.sleep(60000);
      }
    }
  }

  sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }
}
