import { v1alpha2 as protocol_v1alpha2 } from '@apibara/protocol';
import { Chain, ResolverConfig } from 'types';

export const ResolverName = 'liquity_lending';

export const BATCH_REQUEST = '0x01502ad39d6a2545a2ed37ddba44b02ecc2a62b06efa1d69213ff7c158a94a34';

export const ResolverConfigurations: ResolverConfig = {
  name: 'trove_275',
  addresses: ['0x016a8a20fafbe9afa5ddeaa03640656192c9e39bf96a34e0135de866beba619b'],
  startBlock: 927880,
  apibaraFilterConfig: {
    network: Chain.STARKNET,
    keys: [BATCH_REQUEST],
    finality: protocol_v1alpha2.DataFinality.DATA_STATUS_ACCEPTED,
    restart: true,
    sink: 'liquity_lending',
  },
};

// https://github.com/BibliothecaDAO/loot-survivor/blob/main/indexer/src/discoveries.ts
