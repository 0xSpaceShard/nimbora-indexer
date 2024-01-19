import { CheckpointConfig } from '@snapshot-labs/checkpoint';
import { ConfigService } from 'common/config';
import * as PoolingManager from 'config/checkpoint/poolingManager.json';

export const yieldDexConfig = (configService: ConfigService): CheckpointConfig => {
  return {
    network_node_url: configService.get('ALCHEMY_RPC_URL'),
    sources: [
      {
        contract: configService.get('YIELD_DEX_L2_POOLING_MANAGER'),
        start: configService.get('YIELD_DEX_L2_POOLING_MANAGER_START_BLOCK'),
        ...PoolingManager,
      },
    ],
  };
};
