import { SinkPersistentMetadata } from 'types';

export interface IPersistent {
  setState(sinkPersistentMetadata: SinkPersistentMetadata): Promise<void>;
  getState(sink: string): Promise<SinkPersistentMetadata>;
  deleteState(sink: string): Promise<void>;
}
