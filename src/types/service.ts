import { CheckpointWriters } from '@snapshot-labs/checkpoint';

export interface Source {
  contract: string;
  start: number;
  events: Array<Record<string, any>>;
}

export interface Template {
  [key: string]: Record<string, any>;
}

export interface Service {
  config(): { sources: Array<Source>; templates?: Template };
  writers(): CheckpointWriters;
}
