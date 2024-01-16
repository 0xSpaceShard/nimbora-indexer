import { CheckpointConfig } from '@snapshot-labs/checkpoint';
import YieldDexConfig from 'config/checkpoint/config.json';

export const yieldDexConfig: CheckpointConfig = {
  network_node_url: '',
  ...YieldDexConfig,
};
