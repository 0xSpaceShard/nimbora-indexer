import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { _checkpoints } from './entities/checkpoint.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StorageService {
  constructor(@InjectRepository(_checkpoints) private readonly checkpointRepository: Repository<_checkpoints>) {}

  async findCheckpointsByContractAddress(contractAddress: string, limit = 5, offset = 0): Promise<_checkpoints[]> {
    return await this.checkpointRepository.find({
      where: { contract_address: contractAddress },
      take: limit,
      skip: offset,
    });
  }
}
