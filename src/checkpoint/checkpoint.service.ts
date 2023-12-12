import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataSource } from 'typeorm';
import { Withdraw } from '../schemas/withdraw.schema.ts';


@Injectable()
export class CheckpointService {
    static withdrawModel: any;
    constructor(@InjectModel('Withdraw') private readonly withdrawModel: Model<Withdraw>, private dataSource: DataSource) {}
    
    static create(withdraw: { id: any; amount: any; l1_recipient: any; caller_address: any; created_at: any; created_at_block: number; }) {
        const createdWithsdraw = new this.withdrawModel(withdraw);
        return createdWithsdraw.save();
    }
    
    async getWithdrawals(): Promise<Withdraw[]> {
        return this.withdrawModel.find().exec();
    }
}

