import { Injectable } from '@nestjs/common';
import { ConfigService } from 'common/config';
import { liquityAddresses } from './liquity.constants';
import { Service, Source, Template } from 'types/service';
import { CheckpointWriters, Event } from '@snapshot-labs/checkpoint';
import { CheckpointWriter } from 'types';
import { Liquity_Batch, Liquity_UserAction } from 'types/generated/models';
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

  seed(): Array<{ contract: string; blocks: Array<number> }> {
    const addresses = liquityAddresses(this.configService.get('NETWORK'));
    const data: Array<{ contract: string; blocks: Array<number> }> = [];
    for (let i = 0; i < addresses.length; i++) {
      const { blocks, contract } = addresses[i];
      data.push({ contract, blocks });
    }
    return data;
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

      liquity_actionProcessed: async ({ tx, block, rawEvent, source }: CheckpointWriter) => {
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
        let userAction: Liquity_UserAction = await Liquity_UserAction.loadEntity(id);
        if (userAction) return;

        userAction = new Liquity_UserAction(id);

        userAction.action = Number(data[2]);
        userAction.user = data[3];
        userAction.amount = uint256
          .uint256ToBN({
            low: data[4],
            high: data[5],
          })
          .toString();
        userAction.hash = tx.transaction_hash;
        userAction.address = source.contract;
        userAction.block = block.block_number;
        userAction.timestamp = block.timestamp;

        await userAction.save();
      },
    };
  }
}
