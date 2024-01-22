import { Injectable } from '@nestjs/common';
import { CheckpointService } from 'checkpoint/checkpoint.service';
import { yieldDexConfig } from './yield-dex.config';
import { yieldDexWriters } from './yieldDex.writer';
import * as poolingManager from '../abi/PoolingManager.json';
import * as erc20 from '../abi/ERC20.json';
import { ConfigService } from 'common/config';
import { CheckpointOptions } from '@snapshot-labs/checkpoint';

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
          PoolingManager: poolingManager,
          ERC20: erc20
        },
      },
    );
  }
}
