import type { CheckpointWriter } from '@snapshot-labs/checkpoint';

export const handleWithdrawInitiated: CheckpointWriter = async ({ tx, block, blockNumber, event, rawEvent, eventIndex, mysql }) => {
    console.log("Handle Withdraw Initiated");

    if (!block || !event) return;
    
    console.log(">>> blockNumber: " + blockNumber);
    let eventObject = JSON.parse(JSON.stringify(event));

    console.log(">>>", eventIndex);
    console.log(">>> tx hash", tx.transaction_hash);

    eventObject.amount = 
        (BigInt(eventObject.amount.low) + 
        (BigInt(eventObject.amount.high) << 
        BigInt(64))).toString();
    
    const timestamp = block.timestamp;

    const withdraws = {
        id: tx.transaction_hash,
        amount: eventObject.amount,
        l1_recipient: eventObject.l1_recipient,
        caller_address: eventObject.caller_address,
        created_at: timestamp,
        created_at_block: blockNumber
    };
    await mysql.queryAsync('INSERT IGNORE INTO withdraws SET ?', [withdraws]);
}
