import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WithdrawDocument = HydratedDocument<Withdraw>;

@Schema()
export class Withdraw {
    @Prop()
    id: string;

    @Prop()
    amount: string;

    @Prop()
    l1_recipient: string;

    @Prop()
    caller_address: string;

    @Prop()
    created_at: number;

    @Prop()
    created_at_block: number;

}

export const WithdrawSchema = SchemaFactory.createForClass(Withdraw);