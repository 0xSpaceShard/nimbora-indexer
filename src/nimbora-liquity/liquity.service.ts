import { Injectable } from '@nestjs/common';
import { ConfigService } from 'common/config';
import { liquityAddresses } from './liquity.constants';
import { Service, Source, Template } from 'types/service';
import { CheckpointWriters, Event } from '@snapshot-labs/checkpoint';
import { CheckpointWriter } from 'types';
import { Liquity_Batch } from 'types/generated/models';
import { uint256 } from 'starknet';

@Injectable()
export class LiquityService implements Service {
  constructor(readonly configService: ConfigService) {}

  config(): { sources: Array<Source>; templates?: Template } {
    const addresses = liquityAddresses(this.configService.get('NETWORK'));
    const sources: Array<Source> = [];
    for (let i = 0; i < addresses.length; i++) {
      const { contract, start, events } = addresses[i];
      sources.push({ contract, start, events });
    }
    return { sources };
  }

  writers(): CheckpointWriters {
    return {
      liquity_HandleBatchRequest: async ({ tx, block, rawEvent, source }: CheckpointWriter) => {
        if (!block || !rawEvent) return;

        const { data } = rawEvent as Event;
        const nonce = Number(
          uint256
            .uint256ToBN({
              low: data[0],
              high: data[1],
            })
            .toString(),
        );
        const id = `${tx.transaction_hash}_${nonce}`;

        let batch = await Liquity_Batch.loadEntity(id);
        if (batch) return;

        batch = new Liquity_Batch(id);
        batch.nonce = nonce;

        batch.eth = uint256
          .uint256ToBN({
            low: data[2],
            high: data[3],
          })
          .toString();

        batch.lusd = uint256
          .uint256ToBN({
            low: data[4],
            high: data[5],
          })
          .toString();
        batch.hash = tx.transaction_hash;
        batch.address = source.contract;
        batch.block = block.block_number;
        batch.timestamp = block.timestamp;

        await batch.save();
      },
    };
  }
}
