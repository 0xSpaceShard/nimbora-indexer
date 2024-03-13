import { ServiceStatusPerNetwork } from 'types';

export const serviceStatusPerNetwork: ServiceStatusPerNetwork = {
  mainnet: {
    liquity: true,
    yieldDex: false,
  },
  sepolia: {
    liquity: false,
    yieldDex: true,
  },
};
