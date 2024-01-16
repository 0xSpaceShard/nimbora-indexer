import { CheckpointConfig } from '@snapshot-labs/checkpoint';
import * as YieldDexConfig from 'config/checkpoint/config.json';

export const yieldDexConfig: CheckpointConfig = {
  network_node_url: '',
  ...YieldDexConfig,
};
