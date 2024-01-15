import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';

export const formatDecimals = (value: BigNumber): string => {
  if (!value.toString()) return '0';
  return ethers.formatUnits(value.toString(), 18).toString();
};

export const callWithRetry = async (retries: number, delay: number, callback: any, errorCallback: any) => {
  for (let i = 1; i <= retries; i++) {
    try {
      return await callback(i);
    } catch (error: any) {
      sleep(delay);
      if (i == retries) {
        errorCallback(error);
      }
    }
  }
};

export const sleep = (s: number) => new Promise((r) => setTimeout(r, s * 1000));
