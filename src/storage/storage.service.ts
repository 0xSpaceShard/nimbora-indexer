import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { _checkpoints } from './entities/checkpoint.entity';
import { _metadatas } from './entities/metadata.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StorageService {
  constructor(@InjectRepository(_checkpoints) private readonly checkpointRepository: Repository<_checkpoints>, @InjectRepository(_metadatas) private readonly metadataRepository: Repository<_metadatas>) {}

  async findCheckpointsByContractAddress(contractAddress: string, limit = 5, offset = 0): Promise<_checkpoints[]> {
    return await this.checkpointRepository.find({
      where: { contract_address: contractAddress },
      take: limit,
      skip: offset,
    });
  }

  async lastIndexedBlockNumber(): Promise<number> {
      const metadata = await this.metadataRepository.find({
        where: { id: "last_indexed_block" },
      });

      // If metadata is found, parse its value as an integer and return it
      if (metadata.length && metadata[0].value !== null) {
        const lastIndexedBlock = parseInt(metadata[0].value, 10);
        if (!isNaN(lastIndexedBlock)) {
          return lastIndexedBlock;
        }
      }
      
      // If metadata is not found or cannot be parsed, return 0
      return 0;
  }
}
