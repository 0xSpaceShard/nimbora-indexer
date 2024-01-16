import { CheckpointWriters } from '@snapshot-labs/checkpoint';
import { CheckpointWriter } from 'types';
import { FeeRecipient } from 'types/generated/models';

export const yieldDexWriters: CheckpointWriters = {
  handleSetFeeRecipient: async ({ tx, block, rawEvent }: CheckpointWriter) => {
    if (!block || !rawEvent) return;

    const { data } = rawEvent as any;
    const feeRecipient = new FeeRecipient(tx.transaction_hash);
    feeRecipient.recipient = data[0];
    await feeRecipient.save();
  },
};
