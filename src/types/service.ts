import { CheckpointWriters } from '@snapshot-labs/checkpoint';

export interface Config {
  contract: string;
  start: number;
  events: Array<Record<string, any>>;
}

export interface Service {
  config(): Array<Config>;
  writers(): CheckpointWriters;
}
