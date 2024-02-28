import { ServiceStatusPerNetwork } from 'types';

export const serviceStatusPerNetwork: ServiceStatusPerNetwork = {
  mainnet: {
    liquity: true,
    yieldDex: true,
  },
  sepolia: {
    liquity: false,
    yieldDex: true,
  },
};
