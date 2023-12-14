import { Injectable } from '@nestjs/common';
import type { CheckpointWriter } from '@snapshot-labs/checkpoint';
import { CheckpointService } from 'checkpoint/checkpoint.service';

@Injectable()
export class CheckpointWriters {
    constructor(private readonly checkpointService: CheckpointService) {};


    writers() {
        return {
            handleWithdrawInitiated: async ({ tx, block, blockNumber, event, eventIndex }: Parameters<CheckpointWriter>[0]) => {
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
                this.checkpointService.writeWithdraw(withdraws);
            }
        }
    }
}

