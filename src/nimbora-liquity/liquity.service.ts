import { Injectable } from '@nestjs/common';
import { ConfigService } from 'common/config';
import { liquityAddresses, ZeroAddress } from './liquity.constants';
import { Service, Source, Template } from 'types/service';
import { CheckpointWriters, Event } from '@snapshot-labs/checkpoint';
import { CheckpointWriter } from 'types';
import { Liquity_Batch, Liquity_Daily_Debt, Liquity_Debt, Liquity_UserAction } from 'types/generated/models';
import { uint256, validateAndParseAddress } from 'starknet';

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

      liquity_Transfer: async ({ block, rawEvent }: CheckpointWriter) => {
        if (!block || !rawEvent) return;

        const { data } = rawEvent as Event;

        const from = validateAndParseAddress(data[0]);
        const to = validateAndParseAddress(data[1]);
        const amount = uint256.uint256ToBN({ low: data[2], high: data[3] });

        const timestamp = block.timestamp - (block.timestamp % 86400);

        const troves = liquityAddresses(this.configService.get('NETWORK'));

        let debt: Liquity_Debt;
        let dailyDebt: Liquity_Daily_Debt;

        if (from == ZeroAddress || to == ZeroAddress) {
          // Ignore RequestBatch/ResponseBatch when bridge tokens from L2 <> L1.
          return;
        } else if (from == troves[0].contract || from == troves[1].contract) {
          // Borrow the `to` is the user and the `from` is the trove address.
          const totalDebtId = `${to}_${from}`;
          const dailyDebtId = `${to}_${from}_${timestamp}`;

          // Increase debt by 1% to include liquity fee when borrow.
          // amount = amount + amount / 100n;

          debt = await Liquity_Debt.loadEntity(totalDebtId);
          if (!debt) {
            debt = new Liquity_Debt(totalDebtId);
            debt.user = to;
            debt.trove = from;
            debt.amount = '0';
          } else if (debt.block >= block.block_number) return;
          debt.amount = (BigInt(debt.amount) + amount).toString();
          debt.count++;

          dailyDebt = await Liquity_Daily_Debt.loadEntity(dailyDebtId);
          if (!dailyDebt) {
            dailyDebt = new Liquity_Daily_Debt(dailyDebtId);
            dailyDebt.trove = from;
            dailyDebt.user = to;
            dailyDebt.amount = debt.amount;
          } else {
            dailyDebt.amount = (BigInt(dailyDebt.amount) + amount).toString();
          }
        } else if (to == troves[0].contract || to == troves[1].contract) {
          // Repay the `to` is the trove address and the `from` is the user.

          const totalDebtId = `${from}_${to}`;
          const dailyDebtId = `${from}_${to}_${timestamp}`;
          debt = await Liquity_Debt.loadEntity(totalDebtId);
          if (debt.block >= block.block_number) return;
          let remaining = BigInt(debt.amount) - amount;
          // Info: This check is required because we are tracking the LUSD balance the users receive but nio
          debt.amount = remaining > 0n ? remaining.toString() : '0';
          debt.count++;

          dailyDebt = await Liquity_Daily_Debt.loadEntity(dailyDebtId);
          if (!dailyDebt) {
            dailyDebt = new Liquity_Daily_Debt(dailyDebtId);
            dailyDebt.user = from;
            dailyDebt.trove = to;
            dailyDebt.amount = debt.amount;
          } else {
            remaining = BigInt(dailyDebt.amount) - amount;
            dailyDebt.amount = remaining > 0n ? remaining.toString() : '0';
          }
        } else {
          return;
        }

        debt.timestamp = timestamp;
        debt.block = block.block_number;
        dailyDebt.timestamp = timestamp;
        dailyDebt.block = block.block_number;

        await debt.save();
        await dailyDebt.save();
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
