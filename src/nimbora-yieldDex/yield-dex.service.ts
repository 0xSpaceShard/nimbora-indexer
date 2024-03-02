import { Injectable } from '@nestjs/common';
import { ConfigService } from 'common/config';
import { Service, Source, Template } from 'types/service';
import { UpgradeEventsBlock, ZeroAddress, ydAddresses } from './yield-dex.constants';
import { CheckpointWriters } from '@snapshot-labs/checkpoint';
import { CheckpointWriter } from 'types';
import {
  YieldDex_TM_Transfer,
  YieldDex_ClaimWithdrawal,
  YieldDex_Deposit,
  YieldDex_DustLimitUpdated,
  YieldDex_FeeRecipient,
  YieldDex_L1ReportHash,
  YieldDex_NewL2Report,
  YieldDex_PerformanceFeeUpdated,
  YieldDex_RequestWithdrawal,
  YieldDex_StrategyRegistered,
  YieldDex_WithdrawalEpochUpdated,
  YieldDex_TM_balanceOf,
  YieldDex_TM_holders,
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

        const afterUpgrade = UpgradeEventsBlock < block.block_number;

        strategy.l2Strategy = data[0];
        strategy.token = data[1];
        strategy.l1Strategy = data[2];
        strategy.underlying = data[3];
        strategy.performanceFees = uint256.uint256ToBN({ high: data[5], low: data[4] }).toString();
        strategy.tvlLimit = afterUpgrade ? '0' : uint256.uint256ToBN({ high: data[7], low: data[6] }).toString();

        await instance.executeTemplate('erc20', {
          contract: strategy.token,
          start: block.block_number,
        });

        await strategy.save();
      },

      yd_HandlePerformanceFeeUpdated: async ({ tx, block, rawEvent, eventIndex }: CheckpointWriter) => {
        if (!block || !rawEvent) return;

        const { data } = rawEvent as any;
        const id = `${tx.transaction_hash}_${eventIndex}`;
        let performance = await YieldDex_PerformanceFeeUpdated.loadEntity(id);
        if (performance) return;
        performance = new YieldDex_PerformanceFeeUpdated(id);

        const afterUpgrade = UpgradeEventsBlock < block.block_number;

        performance.l1Strategy = data[0];
        performance.l2Strategy = afterUpgrade ? data[1] : ZeroAddress;
        let shift = 0;
        if (afterUpgrade) {
          shift++;
        }
        performance.newPerfomanceFees = uint256.uint256ToBN({ high: data[2 + shift], low: data[1 + shift] }).toString();

        await performance.save();
      },

      yd_HandleWithdrawalEpochUpdated: async ({ tx, block, rawEvent, eventIndex }: CheckpointWriter) => {
        if (!block || !rawEvent) return;

        const { data } = rawEvent as any;
        const id = `${tx.transaction_hash}_${eventIndex}`;
        let withdrawal = await YieldDex_WithdrawalEpochUpdated.loadEntity(id);
        if (withdrawal) return;
        const afterUpgrade = UpgradeEventsBlock < block.block_number;
        withdrawal = new YieldDex_WithdrawalEpochUpdated(id);
        withdrawal.l1Strategy = data[0];
        withdrawal.l2Strategy = afterUpgrade ? data[1] : ZeroAddress;
        let shift = 0;
        if (afterUpgrade) {
          shift++;
        }
        withdrawal.newWithdrawalEpochDelay = uint256
          .uint256ToBN({ high: data[2 + shift], low: data[1 + shift] })
          .toString();

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
        let deposit: YieldDex_Deposit = await YieldDex_Deposit.loadEntity(id);
        if (deposit) return;
        const afterUpgrade = UpgradeEventsBlock < block.block_number;

        deposit = new YieldDex_Deposit(id);
        deposit.l1Strategy = data[0];
        deposit.l2Strategy = afterUpgrade ? data[1] : ZeroAddress;
        let shift = 0;
        if (afterUpgrade) {
          shift++;
        }
        deposit.caller = data[1 + shift];
        deposit.receiver = data[2 + shift];
        deposit.assets = uint256.uint256ToBN({ high: data[4 + shift], low: data[3 + shift] }).toString();
        deposit.shares = uint256.uint256ToBN({ high: data[6 + shift], low: data[5 + shift] }).toString();
        deposit.referal = data[7 + shift];
        deposit.timestamp = block.timestamp;

        await deposit.save();
      },

      yd_HandleRequestWithdrawal: async ({ tx, block, rawEvent, eventIndex, source }: CheckpointWriter) => {
        if (!block || !rawEvent) return;

        const { data } = rawEvent as any;
        const id = `${tx.transaction_hash}_${eventIndex}`;
        let requestWithdrawal = await YieldDex_RequestWithdrawal.loadEntity(id);
        if (requestWithdrawal) return;

        const afterUpgrade = UpgradeEventsBlock < block.block_number;
        requestWithdrawal = new YieldDex_RequestWithdrawal(id);
        requestWithdrawal.l1Strategy = data[0];
        requestWithdrawal.l2Strategy = afterUpgrade ? data[1] : ZeroAddress;
        let shift = 0;
        if (afterUpgrade) {
          shift++;
        }

        requestWithdrawal.caller = data[1 + shift];
        requestWithdrawal.assets = uint256.uint256ToBN({ high: data[3 + shift], low: data[2 + shift] }).toString();
        requestWithdrawal.shares = uint256.uint256ToBN({ high: data[5 + shift], low: data[4 + shift] }).toString();
        requestWithdrawal.withdrawalId = uint256
          .uint256ToBN({ high: data[7 + shift], low: data[6 + shift] })
          .toString();
        requestWithdrawal.epoch = Number(
          uint256.uint256ToBN({ high: data[9 + shift], low: data[8 + shift] }).toString(),
        );
        requestWithdrawal.timestamp = block.timestamp;

        await requestWithdrawal.save();
      },

      yd_HandleClaimWithdrawal: async ({ tx, block, rawEvent, eventIndex }: CheckpointWriter) => {
        if (!block || !rawEvent) return;

        const { data } = rawEvent as any;

        const id = `${tx.transaction_hash}_${eventIndex}`;
        let claimWithdrawal = await YieldDex_ClaimWithdrawal.loadEntity(id);
        if (claimWithdrawal) return;

        const afterUpgrade = UpgradeEventsBlock < block.block_number;
        claimWithdrawal = new YieldDex_ClaimWithdrawal(id);
        claimWithdrawal.l1Strategy = data[0];
        claimWithdrawal.l2Strategy = afterUpgrade ? data[1] : ZeroAddress;
        let shift = 0;
        if (afterUpgrade) {
          shift++;
        }
        claimWithdrawal.caller = data[1 + shift];
        claimWithdrawal.claimId = uint256.uint256ToBN({ high: data[3 + shift], low: data[2 + shift] }).toString();
        claimWithdrawal.underlyingAmount = uint256
          .uint256ToBN({ high: data[5 + shift], low: data[4 + shift] })
          .toString();
        claimWithdrawal.timestamp = block.timestamp;

        await claimWithdrawal.save();
      },

      tm_handleTransfer: async ({ tx, block, rawEvent, eventIndex }: CheckpointWriter) => {
        if (!block || !rawEvent) return;
        const id = `${tx.transaction_hash}_${eventIndex}`;

        let transfer = await YieldDex_TM_Transfer.loadEntity(id);
        if (transfer) return;

        const { data, keys, from_address } = rawEvent as any;
        transfer = new YieldDex_TM_Transfer(`${tx.transaction_hash}_${eventIndex}`);
        transfer.contractAddress = from_address;
        transfer.to = keys[0];
        transfer.from = keys[1];
        transfer.value = uint256.uint256ToBN({ high: data[1], low: data[0] }).toString();
        transfer.timestamp = block.timestamp;

        let fromBalanceInfo: YieldDex_TM_balanceOf = await YieldDex_TM_balanceOf.loadEntity(transfer.from);
        let toBalanceInfo: YieldDex_TM_balanceOf = await YieldDex_TM_balanceOf.loadEntity(transfer.to);
        let holdersInfo: YieldDex_TM_holders = await YieldDex_TM_holders.loadEntity(from_address);

        let fromBalance = BigInt(0);
        let toBalance = BigInt(0);
        let holders = 0;

        if (fromBalanceInfo) {
          fromBalance = BigInt(fromBalanceInfo.balance);
        }
        if (toBalanceInfo) {
          toBalance = BigInt(toBalanceInfo.balance);
        }

        const newFromBalance = fromBalance - BigInt(transfer.value);
        const newtoBalance = toBalance + BigInt(transfer.value);

        if (!fromBalanceInfo) {
          fromBalanceInfo = new YieldDex_TM_balanceOf(transfer.from);
        }
        if (!toBalanceInfo) {
          toBalanceInfo = new YieldDex_TM_balanceOf(transfer.to);
        }
        if (!holdersInfo) {
          holdersInfo = new YieldDex_TM_holders(from_address);
        }

        if (holdersInfo) {
          if (toBalance == BigInt(0) && transfer.to != '0x0') {
            holders++;
          }
          if (newFromBalance == BigInt(0) && transfer.from != '0x0') {
            holders--;
          }
        } else {
          holders = 1;
        }

        fromBalanceInfo.balance = String(newFromBalance);
        toBalanceInfo.balance = String(newtoBalance);
        holdersInfo.holders = holders;

        if (transfer.from != '0x0') {
          await fromBalanceInfo.save();
        }

        if (transfer.to != '0x0') {
          await toBalanceInfo.save();
        }
        await holdersInfo.save();
        await transfer.save();
      },
    };
  }
}
