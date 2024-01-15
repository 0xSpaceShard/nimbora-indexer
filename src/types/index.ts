import { Cursor } from '@apibara/protocol/dist/proto/apibara/node/v1alpha2/Cursor';
import { apibara } from '@apibara/starknet/dist/proto/generated';
import { v1alpha2 as protocol_v1alpha2 } from '@apibara/protocol';

export enum Network {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
  LOCALHOST = 'localhost',
}

export enum Chain {
  ETHEREUM = 'ethereum',
  STARKNET = 'starknet',
}

export interface BaseResolver {
  resolverConfigs(): ResolverConfig;
}

export interface ICheckpointResolver extends BaseResolver {
  checkpointHandleData(): Promise<void>;
}

export interface IApibaraResolver extends BaseResolver {
  apibaraHandleData(block: apibara.starknet.v1alpha2.Block): Promise<void>;
  apibaraHandleInvalidate(cursor: Cursor): Promise<void>;
  apibaraHandleHeartbeat(): Promise<void>;
}

export interface ApibaraResolvers {
  [key: string]: IApibaraResolver;
}

export interface IResolver extends IApibaraResolver, ICheckpointResolver {}

export interface ResolversConfig {
  [name: string]: ResolverConfig;
}

export interface ResolverConfig {
  name: string;
  addresses: Array<string>;
  startBlock: number;
  apibaraFilterConfig: ApibaraFilterConfig;
}

export interface ApibaraFilterConfig {
  network: Chain;
  keys: Array<string>;
  finality: protocol_v1alpha2.DataFinality;
  sink: string;
  restart: boolean;
}

export interface SinkPersistentMetadata {
  sink: string;
  cursor: number;
  filter: string;
}
