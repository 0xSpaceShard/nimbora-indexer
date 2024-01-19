import { CheckpointWriters } from '@snapshot-labs/checkpoint';
import { CheckpointWriter } from 'types';
import { claim_withdrawal, deposit, deposit_limit_updated, dust_limit_updated, fee_recipient, l1_report_hash, new_l2_report, performance_fee_updated, request_withdrawal, strategy_l2_report, strategy_registered, withdraw_limit_updated, withdrawal_epoch_updated } from 'types/generated/models';
import { uint256 } from 'starknet';

export const yieldDexWriters: CheckpointWriters = {
  handleSetFeeRecipient: async ({ tx, block, rawEvent }: CheckpointWriter) => {
    if (!block || !rawEvent) return;

    const { data } = rawEvent as any;
    const feeRecipient = new fee_recipient(tx.transaction_hash);
    feeRecipient.recipient = data[0];
    await feeRecipient.save();
  },

  handleNewL1ReportHash: async ({ tx, block, rawEvent }: CheckpointWriter) => {
    if (!block || !rawEvent) return;

    const { data } = rawEvent as any;
    const l1ReportHash = new l1_report_hash(tx.transaction_hash);
    l1ReportHash.hash = data[0];
    await l1ReportHash.save();
  },

  handleNewL2Report: async ({ tx, block, rawEvent }: CheckpointWriter) => {
    if (!block || !rawEvent) return;

    const { data } = rawEvent as any;
    const l2Report = new new_l2_report(tx.transaction_hash);
    l2Report.newEpoch = uint256.uint256ToBN({high: data[1], low:data[0]}).toString();
    
    var bridgeDeposits = [];
    var reports = [];
    var bridgeWithdraws = [];

    var index = parseInt(data[2]);
    var eventPointer = 3;

    for (let i = 0; i < index; i++) {
      bridgeDeposits.push(JSON.stringify({
        l1Bridge: data[eventPointer++], 
        amount: uint256.uint256ToBN({
          low:data[eventPointer++], 
          high: data[eventPointer++]
        }).toString()
      }));
    }
    index = parseInt(data[eventPointer++]);

    for (let i = 0; i < index; i++) {
      reports.push(JSON.stringify({
        l1Strategy: data[eventPointer++],
        actionId: uint256.uint256ToBN({low:data[eventPointer++], high: data[eventPointer++]}).toString(),
        amount: uint256.uint256ToBN({low:data[eventPointer++], high: data[eventPointer++]}).toString(),
        newSharePrice: uint256.uint256ToBN({low:data[eventPointer++], high: data[eventPointer++]}).toString()
      }));
    }
    index = parseInt(data[eventPointer++]);

    for (let i = 0; i < index; i++) {
      bridgeWithdraws.push(JSON.stringify({
        l1Bridge: data[eventPointer++], 
        amount: uint256.uint256ToBN({
          low:data[eventPointer++], 
          high: data[eventPointer++]
        }).toString()
      }));
    }    

    l2Report.timestamp = block.timestamp;
    l2Report.blockNumber = block.block_number;
    l2Report.newBridgeDeposit = bridgeDeposits;
    l2Report.newL2Report = reports;
    l2Report.newBridgeWithdraw = bridgeWithdraws;
    
    await l2Report.save();
  },

  handleRegisterStrategy: async ({ tx, block, rawEvent }: CheckpointWriter) => {
    if (!block || !rawEvent) return;

    const { data } = rawEvent as any;
    const strategy = new strategy_registered(tx.transaction_hash);
    strategy.tokenManager = data[0];
    strategy.token = data[1];
    strategy.l1Strategy = data[2];
    strategy.underlying = data[3];
    strategy.performanceFees = uint256.uint256ToBN({high: data[5], low:data[4]}).toString();
    strategy.minDeposit = uint256.uint256ToBN({high: data[7], low:data[6]}).toString();
    strategy.maxDeposit = uint256.uint256ToBN({high: data[9], low:data[8]}).toString();
    strategy.minWithdrawal = uint256.uint256ToBN({high: data[11], low:data[10]}).toString();
    strategy.maxWithdrawal = uint256.uint256ToBN({high: data [13], low:data[12]}).toString();
    await strategy.save();
  },

  handleDepositLimitUpdated: async ({ tx, block, rawEvent }: CheckpointWriter) => {
    if (!block || !rawEvent) return;

    const { data } = rawEvent as any;
    const depositLimit = new deposit_limit_updated(tx.transaction_hash);
    depositLimit.l1Strategy = data[0];
    depositLimit.newMinDepositLimit = uint256.uint256ToBN({high: data[2], low:data[1]}).toString();
    depositLimit.newMaxDepositLimit = uint256.uint256ToBN({high: data[4], low:data[3]}).toString();

    await depositLimit.save();
  },

  handleWithdrawLimitUpdated: async ({ tx, block, rawEvent }: CheckpointWriter) => {
    if (!block || !rawEvent) return;

    const { data } = rawEvent as any;
    const withdrawLimit = new withdraw_limit_updated(tx.transaction_hash);
    withdrawLimit.l1Strategy = data[0];
    withdrawLimit.newMinWithdrawLimit = uint256.uint256ToBN({high: data[2], low:data[1]}).toString();
    withdrawLimit.newMaxWithdrawLimit = uint256.uint256ToBN({high: data[4], low:data[3]}).toString();

    await withdrawLimit.save();
  },

  handlePerformanceFeeUpdated: async ({ tx, block, rawEvent }: CheckpointWriter) => {
    if (!block || !rawEvent) return;

    const { data } = rawEvent as any;
    const performance = new performance_fee_updated(tx.transaction_hash);
    performance.l1Strategy = data[0];
    performance.newPerfomanceFees = uint256.uint256ToBN({high: data[2], low:data[1]}).toString();

    await performance.save();
  },

  handleWithdrawalEpochUpdated: async ({ tx, block, rawEvent }: CheckpointWriter) => {
    if (!block || !rawEvent) return;

    const { data } = rawEvent as any;
    const withdrawal = new withdrawal_epoch_updated(tx.transaction_hash);
    withdrawal.l1Strategy = data[0];
    withdrawal.newWithdrawalEpochDelay = uint256.uint256ToBN({high: data[2], low:data[1]}).toString();

    await withdrawal.save();
  },

  handleDustLimitUpdated: async ({ tx, block, rawEvent }: CheckpointWriter) => {
    if (!block || !rawEvent) return;

    const { data } = rawEvent as any;
    const dustLimit = new dust_limit_updated(tx.transaction_hash);
    dustLimit.l1Strategy = data[0];
    dustLimit.newDustLimit = uint256.uint256ToBN({high: data[2], low:data[1]}).toString();

    await dustLimit.save();
  },

  handleDeposit: async ({ tx, block, rawEvent }: CheckpointWriter) => {
    if (!block || !rawEvent) return;

    const { data } = rawEvent as any;
    const _deposit = new deposit(tx.transaction_hash);
    _deposit.l1Strategy = data[0];
    _deposit.caller = data[1];
    _deposit.receiver = data[2];
    _deposit.assets = uint256.uint256ToBN({high: data[4], low:data[3]}).toString();
    _deposit.shares = uint256.uint256ToBN({high: data[6], low:data[5]}).toString();
    _deposit.referal = data[7];

    await _deposit.save();
  },

  handleRequestWithdrawal: async ({ tx, block, rawEvent }: CheckpointWriter) => {
    if (!block || !rawEvent) return;

    const { data } = rawEvent as any;
    const requestWithdrawal = new request_withdrawal(tx.transaction_hash);
    requestWithdrawal.l1Strategy = data[0];
    requestWithdrawal.caller = data[1];
    requestWithdrawal.assets = uint256.uint256ToBN({high: data[3], low:data[2]}).toString();
    requestWithdrawal.shares = uint256.uint256ToBN({high: data[5], low:data[4]}).toString();
    requestWithdrawal.withdrawalId = uint256.uint256ToBN({high: data[7], low:data[6]}).toString();
    requestWithdrawal.epoch = uint256.uint256ToBN({high: data[9], low:data[8]}).toString();

    await requestWithdrawal.save();
  },

  handleClaimWithdrawal: async ({ tx, block, rawEvent }: CheckpointWriter) => {
    if (!block || !rawEvent) return;

    const { data } = rawEvent as any;
    const claimWithdrawal = new claim_withdrawal(tx.transaction_hash);
    claimWithdrawal.l1Strategy = data[0];
    claimWithdrawal.caller = data[1];
    claimWithdrawal.claimId = uint256.uint256ToBN({high: data[3], low:data[2]}).toString();
    claimWithdrawal.underlyingAmount = uint256.uint256ToBN({high: data[5], low:data[4]}).toString();

    await claimWithdrawal.save();
  }
};
