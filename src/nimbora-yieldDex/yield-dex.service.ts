import { Injectable } from '@nestjs/common';
import { ConfigService } from 'common/config';
import { Service, Source, Template } from 'types/service';
import { ydAddresses } from './yield-dex.constants';
import { CheckpointWriters } from '@snapshot-labs/checkpoint';
import { CheckpointWriter } from 'types';
import {
  Transfer,
  YieldDex_ClaimWithdrawal,
  YieldDex_Deposit,
  YieldDex_DepositLimitUpdated,
  YieldDex_DustLimitUpdated,
  YieldDex_FeeRecipient,
  YieldDex_L1ReportHash,
  YieldDex_NewL2Report,
  YieldDex_PerformanceFeeUpdated,
  YieldDex_RequestWithdrawal,
  YieldDex_StrategyRegistered,
  YieldDex_WithdrawLimitUpdated,
  YieldDex_WithdrawalEpochUpdated,
} from 'types/generated/models';
import { uint256 } from 'starknet';

@Injectable()
export class YieldDexService implements Service {
  constructor(readonly configService: ConfigService) {}

  config(): { sources: Array<Source>; templates: Template } {
    const addresses = ydAddresses(this.configService.get('NETWORK'));
    const sources: Array<Source> = [];
    for (let i = 0; i < addresses.length; i++) {
      const { contract, start, events } = addresses[i];
      sources.push({ contract, start, events });
    }
    const templates: Template = {
      erc20: {
        events: [
          {
            name: 'Transfer',
            fn: 'tm_handleTransfer',
          },
        ],
      },
    };
    return { sources, templates };
  }

  writers(): CheckpointWriters {
    return {
      yd_HandleSetFeeRecipient: async ({ tx, block, rawEvent, eventIndex }: CheckpointWriter) => {
        if (!block || !rawEvent) return;

        const { data } = rawEvent as any;

        const id = `${tx.transaction_hash}_${eventIndex}`;
        let feeRecipient = await YieldDex_FeeRecipient.loadEntity(id);
        if (feeRecipient) return;

        feeRecipient = new YieldDex_FeeRecipient(`${tx.transaction_hash}_${eventIndex}`);
        feeRecipient.recipient = data[0];
        await feeRecipient.save();
      },

      yd_HandleNewL1ReportHash: async ({ tx, block, rawEvent, eventIndex }: CheckpointWriter) => {
        if (!block || !rawEvent) return;

        const { data } = rawEvent as any;
        const id = `${tx.transaction_hash}_${eventIndex}`;
        let l1ReportHash = await YieldDex_L1ReportHash.loadEntity(id);
        if (l1ReportHash) return;
        l1ReportHash = new YieldDex_L1ReportHash(id);
        l1ReportHash.hash = data[0];
        await l1ReportHash.save();
      },

      yd_HandleNewL2Report: async ({ tx, block, rawEvent, eventIndex }: CheckpointWriter) => {
        if (!block || !rawEvent) return;

        const { data } = rawEvent as any;

        const id = `${tx.transaction_hash}_${eventIndex}`;
        let l2Report = await YieldDex_NewL2Report.loadEntity(id);
        if (l2Report) return;
        l2Report = new YieldDex_NewL2Report(id);
        l2Report.newEpoch = uint256.uint256ToBN({ high: data[1], low: data[0] }).toString();

        const bridgeDeposits = [];
        const reports = [];
        const bridgeWithdraws = [];

        let index = parseInt(data[2]);
        let eventPointer = 3;

        for (let i = 0; i < index; i++) {
          bridgeDeposits.push(
            JSON.stringify({
              bridge: data[eventPointer++],
              amount: uint256
                .uint256ToBN({
                  low: data[eventPointer++],
                  high: data[eventPointer++],
                })
                .toString(),
            }),
          );
        }
        index = parseInt(data[eventPointer++]);

        for (let i = 0; i < index; i++) {
          reports.push(
            JSON.stringify({
              l1Strategy: data[eventPointer++],
              actionId: uint256.uint256ToBN({ low: data[eventPointer++], high: data[eventPointer++] }).toString(),
              amount: uint256.uint256ToBN({ low: data[eventPointer++], high: data[eventPointer++] }).toString(),
              newSharePrice: uint256.uint256ToBN({ low: data[eventPointer++], high: data[eventPointer++] }).toString(),
            }),
          );
        }
        index = parseInt(data[eventPointer++]);

        for (let i = 0; i < index; i++) {
          bridgeWithdraws.push(
            JSON.stringify({
              bridge: data[eventPointer++],
              amount: uint256
                .uint256ToBN({
                  low: data[eventPointer++],
                  high: data[eventPointer++],
                })
                .toString(),
            }),
          );
        }

        l2Report.timestamp = block.timestamp;
        l2Report.hash = tx.transaction_hash;
        l2Report.blockNumber = block.block_number;
        l2Report.newBridgeDeposit = bridgeDeposits;
        l2Report.newL2Report = reports;
        l2Report.newBridgeWithdraw = bridgeWithdraws;

        await l2Report.save();
      },

      yd_HandleRegisterStrategy: async ({ tx, block, rawEvent, eventIndex, instance }: CheckpointWriter) => {
        if (!block || !rawEvent) return;

        const { data } = rawEvent as any;

        const id = `${tx.transaction_hash}_${eventIndex}`;
        let strategy = await YieldDex_StrategyRegistered.loadEntity(id);
        if (strategy) return;
        strategy = new YieldDex_StrategyRegistered(id);

        strategy.tokenManager = data[0];
        strategy.token = data[1];
        strategy.l1Strategy = data[2];
        strategy.underlying = data[3];
        strategy.performanceFees = uint256.uint256ToBN({ high: data[5], low: data[4] }).toString();
        strategy.minDeposit = uint256.uint256ToBN({ high: data[7], low: data[6] }).toString();
        strategy.maxDeposit = uint256.uint256ToBN({ high: data[9], low: data[8] }).toString();
        strategy.minWithdrawal = uint256.uint256ToBN({ high: data[11], low: data[10] }).toString();
        strategy.maxWithdrawal = uint256.uint256ToBN({ high: data[13], low: data[12] }).toString();

        try {
          await instance.executeTemplate('erc20', {
            contract: strategy.token,
            start: block.block_number,
          });
          console.error('1111111111');
          console.error('1111111111');
        } catch (error) {
          console.error(error);
        }

        await strategy.save();
      },

      yd_HandleDepositLimitUpdated: async ({ tx, block, rawEvent, eventIndex }: CheckpointWriter) => {
        if (!block || !rawEvent) return;

        const { data } = rawEvent as any;
        const id = `${tx.transaction_hash}_${eventIndex}`;
        let depositLimit = await YieldDex_DepositLimitUpdated.loadEntity(id);
        if (depositLimit) return;

        depositLimit = new YieldDex_DepositLimitUpdated(`${tx.transaction_hash}_${eventIndex}`);
        depositLimit.l1Strategy = data[0];
        depositLimit.newMinDepositLimit = uint256.uint256ToBN({ high: data[2], low: data[1] }).toString();
        depositLimit.newMaxDepositLimit = uint256.uint256ToBN({ high: data[4], low: data[3] }).toString();

        await depositLimit.save();
      },

      yd_HandleWithdrawLimitUpdated: async ({ tx, block, rawEvent, eventIndex }: CheckpointWriter) => {
        if (!block || !rawEvent) return;

        const { data } = rawEvent as any;
        const id = `${tx.transaction_hash}_${eventIndex}`;
        let withdrawLimit = await YieldDex_WithdrawLimitUpdated.loadEntity(id);
        if (withdrawLimit) return;

        withdrawLimit = new YieldDex_WithdrawLimitUpdated(id);

        withdrawLimit.l1Strategy = data[0];
        withdrawLimit.newMinWithdrawLimit = uint256.uint256ToBN({ high: data[2], low: data[1] }).toString();
        withdrawLimit.newMaxWithdrawLimit = uint256.uint256ToBN({ high: data[4], low: data[3] }).toString();

        await withdrawLimit.save();
      },

      yd_HandlePerformanceFeeUpdated: async ({ tx, block, rawEvent, eventIndex }: CheckpointWriter) => {
        if (!block || !rawEvent) return;

        const { data } = rawEvent as any;
        const id = `${tx.transaction_hash}_${eventIndex}`;
        let performance = await YieldDex_PerformanceFeeUpdated.loadEntity(id);
        if (performance) return;
        performance = new YieldDex_PerformanceFeeUpdated(id);

        performance.l1Strategy = data[0];
        performance.newPerfomanceFees = uint256.uint256ToBN({ high: data[2], low: data[1] }).toString();

        await performance.save();
      },

      yd_HandleWithdrawalEpochUpdated: async ({ tx, block, rawEvent, eventIndex }: CheckpointWriter) => {
        if (!block || !rawEvent) return;

        const { data } = rawEvent as any;
        const id = `${tx.transaction_hash}_${eventIndex}`;
        let withdrawal = await YieldDex_WithdrawalEpochUpdated.loadEntity(id);
        if (withdrawal) return;
        withdrawal = new YieldDex_WithdrawalEpochUpdated(id);
        withdrawal.l1Strategy = data[0];
        withdrawal.newWithdrawalEpochDelay = uint256.uint256ToBN({ high: data[2], low: data[1] }).toString();

        await withdrawal.save();
      },

      yd_HandleDustLimitUpdated: async ({ tx, block, rawEvent, eventIndex }: CheckpointWriter) => {
        if (!block || !rawEvent) return;

        const { data } = rawEvent as any;
        const id = `${tx.transaction_hash}_${eventIndex}`;
        let dustLimit = await YieldDex_DustLimitUpdated.loadEntity(id);
        if (dustLimit) return;

        dustLimit = new YieldDex_DustLimitUpdated(id);
        dustLimit.l1Strategy = data[0];
        dustLimit.newDustLimit = uint256.uint256ToBN({ high: data[2], low: data[1] }).toString();

        await dustLimit.save();
      },

      yd_HandleDeposit: async ({ tx, block, rawEvent, eventIndex }: CheckpointWriter) => {
        if (!block || !rawEvent) return;

        const { data } = rawEvent as any;
        const id = `${tx.transaction_hash}_${eventIndex}`;
        let deposit = await YieldDex_Deposit.loadEntity(id);
        if (deposit) return;

        deposit = new YieldDex_Deposit(id);
        deposit.l1Strategy = data[0];
        deposit.caller = data[1];
        deposit.receiver = data[2];
        deposit.assets = uint256.uint256ToBN({ high: data[4], low: data[3] }).toString();
        deposit.shares = uint256.uint256ToBN({ high: data[6], low: data[5] }).toString();
        deposit.referal = data[7];

        await deposit.save();
      },

      yd_HandleRequestWithdrawal: async ({ tx, block, rawEvent, eventIndex }: CheckpointWriter) => {
        if (!block || !rawEvent) return;

        const { data } = rawEvent as any;
        const id = `${tx.transaction_hash}_${eventIndex}`;
        let requestWithdrawal = await YieldDex_RequestWithdrawal.loadEntity(id);
        if (requestWithdrawal) return;

        requestWithdrawal = new YieldDex_RequestWithdrawal(id);
        requestWithdrawal.l1Strategy = data[0];
        requestWithdrawal.caller = data[1];
        requestWithdrawal.assets = uint256.uint256ToBN({ high: data[3], low: data[2] }).toString();
        requestWithdrawal.shares = uint256.uint256ToBN({ high: data[5], low: data[4] }).toString();
        requestWithdrawal.withdrawalId = uint256.uint256ToBN({ high: data[7], low: data[6] }).toString();
        requestWithdrawal.epoch = uint256.uint256ToBN({ high: data[9], low: data[8] }).toString();

        await requestWithdrawal.save();
      },

      yd_HandleClaimWithdrawal: async ({ tx, block, rawEvent, eventIndex }: CheckpointWriter) => {
        if (!block || !rawEvent) return;

        const { data } = rawEvent as any;

        const id = `${tx.transaction_hash}_${eventIndex}`;
        let claimWithdrawal = await YieldDex_ClaimWithdrawal.loadEntity(id);
        if (claimWithdrawal) return;

        claimWithdrawal = new YieldDex_ClaimWithdrawal(id);
        claimWithdrawal.l1Strategy = data[0];
        claimWithdrawal.caller = data[1];
        claimWithdrawal.claimId = uint256.uint256ToBN({ high: data[3], low: data[2] }).toString();
        claimWithdrawal.underlyingAmount = uint256.uint256ToBN({ high: data[5], low: data[4] }).toString();

        await claimWithdrawal.save();
      },

      tm_handleTransfer: async ({ tx, block, rawEvent, eventIndex }: CheckpointWriter) => {
        if (!block || !rawEvent) return;
        const id = `${tx.transaction_hash}_${eventIndex}`;

        let transfer = await Transfer.loadEntity(id);
        if (transfer) return;

        const { data, keys, from_address } = rawEvent as any;
        transfer = new Transfer(`${tx.transaction_hash}_${eventIndex}`);
        transfer.constractAddress = from_address;
        transfer.from = keys[0];
        transfer.to = keys[1];
        transfer.value = uint256.uint256ToBN({ high: data[1], low: data[0] }).toString();

        await transfer.save();
      },
    };
  }
}
