import { Injectable, LoggerService } from '@nestjs/common';
import { StreamClient, ConfigureArgs, StatusObject, OnReconnectResult } from '@apibara/protocol';
import { Filter, FieldElement, EventFilter, v1alpha2 as starknet_v1alpha2, StarkNetCursor } from '@apibara/starknet';
import { ConfigService } from '@nestjs/config';
import { PrometheusService } from 'common/prometheus';
import { IApibaraResolver, ResolverConfig } from 'types';
import { sleep } from 'utils';
import { SleepAfterFail } from './apibara.config';
import { apibara } from '@apibara/starknet/dist/proto/generated';
import { Cursor } from '@apibara/protocol/dist/proto/apibara/node/v1alpha2/Cursor';
import { PostgresPersistentService } from 'persistent/persistent.service';

@Injectable()
export abstract class ApibaraService implements IApibaraResolver {
  client: StreamClient;
  resolverConfig: ResolverConfig;

  constructor(
    readonly logger: LoggerService,
    readonly configService: ConfigService,
    readonly prometheusService: PrometheusService,
    readonly postgresPersistentService: PostgresPersistentService,
    resolverConfig: ResolverConfig,
  ) {
    this.resolverConfig = resolverConfig;
  }

  public async start() {
    const { startBlock, apibaraFilterConfig } = this.resolverConfig;
    const { sink, restart } = apibaraFilterConfig;

    const stats = await this.postgresPersistentService.getState(sink);

    let startCursor = startBlock;
    let filter;
    if (stats && !restart) {
      startCursor = stats.cursor;
      filter = JSON.parse(stats.filter);
    } else {
      startCursor = startBlock;
      filter = this.filter();
      await this.postgresPersistentService.setState({ sink, cursor: startCursor, filter: JSON.stringify(filter) });
    }

    const cursor = StarkNetCursor.createWithBlockNumber(startCursor);

    this.client = await this.connect({
      filter,
      batchSize: 10,
      cursor,
      finality: apibaraFilterConfig.finality,
    });

    while (true) {
      await this.handleData();
      try {
      } catch (error: any) {
        this.logger.warn(`Error to index data`, { error });
        await sleep(SleepAfterFail);
      }
    }
  }

  private async connect(config: ConfigureArgs): Promise<StreamClient> {
    const client = new StreamClient({
      url: this.configService.get('APIBARA_STREAM_URL'),
      token: this.configService.get('APIBARA_TOKEN_API'),
      onReconnect: this.onReconnect,
    });

    client.configure(config);
    return client;
  }

  async onReconnect(err: StatusObject, retryCount: number): Promise<OnReconnectResult | OnReconnectResult> {
    await sleep(10);
    return { reconnect: true };
  }

  private filter(): Uint8Array {
    const filter = Filter.create();

    const { addresses, apibaraFilterConfig } = this.resolverConfig;
    const _keys = [];

    for (let i = 0; i < apibaraFilterConfig.keys.length; i++) {
      const key = apibaraFilterConfig.keys[i];
      _keys.push(FieldElement.fromBigInt(key));
    }

    for (let i = 0; i < addresses.length; i++) {
      const address = FieldElement.fromBigInt(addresses[i]);
      filter.addEvent((builder: EventFilter) => builder.withFromAddress(address).withKeys(_keys));
    }

    filter.withHeader({ weak: true });
    return filter.encode();
  }

  private async handleData() {
    for await (const message of this.client) {
      switch (message.message) {
        case 'data':
          if (message.data?.data) {
            for (const item of message.data.data) {
              const block = starknet_v1alpha2.Block.decode(item);
              await this.apibaraHandleData(block);
            }
          }
          break;
        case 'invalidate':
          await this.apibaraHandleInvalidate(message.invalidate.cursor);
          break;
        case 'heartbeat':
          await this.apibaraHandleHeartbeat();
          break;
      }
    }
  }

  resolverConfigs(): ResolverConfig {
    return this.resolverConfig;
  }

  abstract apibaraHandleData(block: apibara.starknet.v1alpha2.Block): Promise<void>;

  abstract apibaraHandleInvalidate(cursor: Cursor): Promise<void>;

  abstract apibaraHandleHeartbeat(): Promise<void>;
}
