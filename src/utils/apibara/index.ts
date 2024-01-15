import { hash } from 'starknet';

export const eventSelector = (eventName: string) =>
  '0x' + hash.getSelectorFromName(eventName).replace('0x', '').padStart(64, '0');
