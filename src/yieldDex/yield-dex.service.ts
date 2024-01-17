import { Injectable } from '@nestjs/common';
import { CheckpointService } from 'checkpoint/checkpoint.service';
import { CheckpointWriter } from 'types';
import { FeeRecipient } from 'types/generated/models';
import { yieldDexConfig } from './yield-dex.config';
import { yieldDexWriters } from './yieldDex.writer';
import PoolingManager from '../abi/PoolingManager.json';
import { ConfigService } from 'common/config';

@Injectable()
export class YieldDexService {
  constructor(readonly checkpointService: CheckpointService, readonly configService: ConfigService) {}

  async start() {
    this.checkpointService.start(
      yieldDexConfig(this.configService),
      yieldDexWriters,
      'src/schema/checkpoint/schema.gql',
      true,
      {
        abis: {
          PoolingManager,
        },
      },
    );
  }

  static async handleSetFeeRecipient({ block, rawEvent, tx }: CheckpointWriter) {
    if (!block || !rawEvent) return;

    const { data } = rawEvent as any;
    const feeRecipient = new FeeRecipient(tx.transaction_hash);
    feeRecipient.recipient = data[0];
    await feeRecipient.save();
  }
}
