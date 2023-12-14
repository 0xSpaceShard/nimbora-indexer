import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Withdraw } from 'withdraw/withdraw.entity';


@Injectable()
export class CheckpointService {
    constructor(@InjectRepository(Withdraw) private readonly withdrawRepository: Repository<Withdraw>) {}
    
    async writeWithdraw(withdraw: Withdraw): Promise<Withdraw> {
        return this.withdrawRepository.save(withdraw);
    }

    async findOne(id: string): Promise<Withdraw | null> {

        return this.withdrawRepository.findOneBy({ id });
    }
    
    async findAll(): Promise<Withdraw[]> {
        return this.withdrawRepository.find();
    }
}

