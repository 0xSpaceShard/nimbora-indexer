import { apibara } from '@apibara/starknet/dist/proto/generated';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from 'common/config';
import { PrometheusService } from 'common/prometheus';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { PrismaService } from 'prisma/prisma.service';
import { FieldElement } from '@apibara/starknet';
import { ApibaraService } from 'apibara/apibara.service';
import { Cursor } from '@apibara/protocol/dist/proto/apibara/node/v1alpha2/Cursor';
import { BATCH_REQUEST, ResolverConfigurations, ResolverName } from './liquity.config';
import { BatchRequest } from './types/batchRequest';
import { PostgresPersistentService } from 'persistent/persistent.service';

@Injectable()
export class LiquityService extends ApibaraService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    readonly logger: LoggerService,
    readonly configService: ConfigService,
    readonly prometheusService: PrometheusService,
    private prismaService: PrismaService,
    readonly postgresPersistentService: PostgresPersistentService,
  ) {
    super(logger, configService, prometheusService, postgresPersistentService, ResolverConfigurations);
  }

  name(): string {
    return ResolverName;
  }

  async apibaraHandleData(block: apibara.starknet.v1alpha2.Block): Promise<void> {
    const { header, events } = block;
    const { timestamp, blockNumber } = header;
    this.logger.log('Handle data', { timestamp, blockNumber: Number(blockNumber) });

    for (let i = 0; i < events.length; i++) {
      const event = events[i].event;
      const receipt = events[i].receipt;
      const { transactionHash } = receipt;
      const key = FieldElement.toHex(event.keys[0]);
      console.log('11111111111111111111111');

      switch (key) {
        case BATCH_REQUEST:
          console.log('11111111111111111111111');

          const batchRequest = BatchRequest.from(event.data);
          console.log('11111111111111111111111');

          const address = FieldElement.toHex(event.fromAddress);
          console.log('11111111111111111111111');

          const hash = FieldElement.toHex(transactionHash);
          console.log('11111111111111111111111');

          const data = {
            nonce: batchRequest.nonce,
            hash,
            address,
            cursor: Number(blockNumber),
            amountEth: batchRequest.amountEth.toString(),
            amountLusd: batchRequest.amountLusd.toString(),
            network: this.resolverConfig.apibaraFilterConfig.network,
            timestamp: Number(timestamp.seconds),
          };

          const res = await this.prismaService.liquity_lending_batches.upsert({
            where: { nonce: batchRequest.nonce },
            create: data,
            update: data,
          });
          this.logger.log('INSERTED', { res });
        default:
          this.logger.warn('Unknowen event', { key });
      }
    }
  }

  async apibaraHandleInvalidate(cursor: Cursor): Promise<void> {
    await this.prismaService.liquity_lending_batches.deleteMany({
      where: { cursor: { gt: Number(cursor.orderKey) } },
    });
  }

  apibaraHandleHeartbeat(): Promise<void> {
    return;
  }

  apibaraHandleHeartbeat(): Promise<void> {
    return;
  }
}
