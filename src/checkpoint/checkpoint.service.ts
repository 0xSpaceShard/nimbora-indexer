import { Injectable } from '@nestjs/common';
import Checkpoint, {
  CheckpointConfig,
  CheckpointOptions,
  CheckpointWriters,
  LogLevel,
} from '@snapshot-labs/checkpoint';
import * as fs from 'fs';
import * as path from 'path';

import { ConfigService } from 'common/config';

@Injectable()
export class CheckpointService {
  checkpoint: Checkpoint;
  schema: string;

  constructor(readonly configService: ConfigService) {}

  async start(
    config: CheckpointConfig,
    writer: CheckpointWriters,
    schemaPath: string,
    restart = false,
    opts?: CheckpointOptions,
  ) {
    const schemaFile = path.join(process.cwd(), schemaPath);
    this.schema = fs.readFileSync(schemaFile, 'utf8');

    this.checkpoint = new Checkpoint(
      { ...config, network_node_url: this.configService.get('STARKNET_RPC') },
      writer,
      this.schema,
      {
        logLevel: LogLevel.Info,
        prettifyLogs: true,
        ...opts,
        dbConnection: this.configService.get('DATABASE_URL') + '/' + this.configService.get('DATABASE_NAME'),
      },
    );
    if (restart) {
      await this.reset();
    }
    await this.checkpoint.start();
  }

  async reset() {
    await this.checkpoint.reset();
    await this.checkpoint.resetMetadata();
  }
}
