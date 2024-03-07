import { Inject, Injectable, LoggerService } from '@nestjs/common';
import Checkpoint, { CheckpointConfig, LogLevel } from '@snapshot-labs/checkpoint';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from 'common/config';
import { Service } from 'types/service';
import { LiquityService } from 'nimbora-liquity/liquity.service';
import { YieldDexService } from 'nimbora-yieldDex/yield-dex.service';
import { serviceStatusPerNetwork } from 'config/checkpoint';
import { StorageService } from 'storage/storage.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { PrometheusService } from 'common/prometheus';
import { RpcProvider } from 'starknet';
import { ethers } from 'ethers';
import { coreContracts } from 'web3/web3.constants';
import { StarknetCore__factory } from 'web3/generated';

let providerName: string;

@Injectable()
export class CheckpointService {
  checkpoint: Checkpoint;

  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    readonly configService: ConfigService,
    readonly liquityService: LiquityService,
    readonly storageService: StorageService,
    readonly ydService: YieldDexService,
    private readonly prometheusService: PrometheusService,
  ) {
    providerName = this.configService.get('L1_ALCHEMY_RPC_URL');
    prometheusService.web3ProviderRequest.labels({ provider: providerName}).inc(0);
    prometheusService.web3ProviderRequestError.labels({ provider: providerName }).inc(0);

    providerName = this.configService.get('L2_ALCHEMY_RPC_URL');
    prometheusService.web3ProviderRequest.labels({ provider: providerName}).inc(0);
    prometheusService.web3ProviderRequestError.labels({ provider: providerName }).inc(0);
    prometheusService.serviceErrors.labels().inc(0);

  }

  async start() {
    const schemaFile = path.join(process.cwd(), 'src/schema/checkpoint/schema.gql');
    const schema = fs.readFileSync(schemaFile, 'utf8');

    let writers = {};
    let templates = {};
    const sources = [];
    const services = [];

    if (serviceStatusPerNetwork[this.configService.get('NETWORK')].liquity) {
      services.push(this.liquityService);
    }

    if (serviceStatusPerNetwork[this.configService.get('NETWORK')].yieldDex) {
      services.push(this.ydService);
    }

    if (services.length === 0) {
      return;
    }

    for (let i = 0; i < services.length; i++) {
        const service: Service = services[i];
        writers = { ...writers, ...service.writers() };
        const { sources: src, templates: template } = service.config();
        sources.push(...src);
        if (templates) {
          templates = { ...templates, ...template };
        }
    }

    const config: CheckpointConfig = {
      network_node_url: this.configService.get('L2_ALCHEMY_RPC_URL'),
      sources,
      templates,
    };

    this.checkpoint = new Checkpoint(config, writers, schema, {
      logLevel: LogLevel.Info,
      prettifyLogs: true,
      dbConnection: this.configService.get('DATABASE_URL') + '/' + this.configService.get('DATABASE_NAME'),
      fetchInterval: 90000,
    });

    if (this.configService.get('DATABASE_RESET_METADATA')) {
      this.logger.log('Reset checkpoint metadata');
      const seedData = await this.getSeedDatabase();
      this.logger.log('Recover checkpoints', { seedData });

      const lastIndexedBlock = await this.lastIndexedBlock();
      this.logger.log('Recover last indexed block', { lastIndexedBlock });

      await this.checkpoint.resetMetadata();
      await this.checkpoint.seedCheckpoints(seedData);
      await this.checkpoint.setLastIndexedBlock(lastIndexedBlock);

    }

    if (this.configService.get('DATABASE_RESET')) {
      this.logger.log('Reset checkpoint database');
      await this.checkpoint.reset();
    }

    while (true) {
      try {
        await this.checkpoint.start();
      } catch (error) {
        this.logger.warn('Error during indexing', { error });
        this.prometheusService.serviceErrors.labels().inc();
        await this.sleep(60000);
      }
    }
  }

  sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async getSeedDatabase() {
    const { sources } = this.checkpoint.config;
    const checkpoints: Record<string, Array<number>> = {};
    for (let i = 0; i < sources.length; i++) {
      const { contract } = sources[i];
      if (!checkpoints[contract]) {
        checkpoints[contract] = [];
      }
      let index = 0;
      const limit = 50;
      while (true) {
        const offset = index * limit;
        const res = await this.storageService.findCheckpointsByContractAddress(contract, limit, offset);
        if (res.length === 0) {
          break;
        }
        for (let i = 0; i < res.length; i++) {
          const { block_number } = res[i];
          checkpoints[contract].push(block_number);
        }
        index++;
      }
    }

    const keys = Object.keys(checkpoints);

    const seedData = [];

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      seedData.push({
        contract: key,
        blocks: checkpoints[key],
      });
    }
    return seedData;
  }

  lastIndexedBlock = async() => {
    const lastIndexedBlock = await this.storageService.lastIndexedBlockNumber()
    
    this.logger.log('Last Indexed Block', { lastIndexedBlock });
    this.prometheusService.lastIndexedBlockNumber.labels().set(Number(lastIndexedBlock));

    return lastIndexedBlock;
  }

  currentStarknetBlock = async () => {
    this.logger.log('Current starknet block');
    const url = this.configService.get('L2_ALCHEMY_RPC_URL');

    try {
      const provider = new RpcProvider({ nodeUrl: url });
      const currentBlock = (await provider.getBlockLatestAccepted()).block_number;
      
      this.logger.log('Current Starknet Block', { currentBlock });
      this.prometheusService.currentStarknetBlock
          .labels()
          .set(Number(currentBlock));
      this.prometheusService.web3ProviderRequest.labels({ provider: url }).inc();

    } catch (error) {
      this.logger.warn('Current Starknet Block', { error });
      this.prometheusService.web3ProviderRequestError.labels({ provider: url }).inc();

    }
  };

  lastAcceptedBlockOnL1 = async () => {
    this.logger.log('Last accepted block on l1');
    const url = this.configService.get('L1_ALCHEMY_RPC_URL');

    try {
      const provider = new ethers.JsonRpcProvider(url);
      const coreContractAddress = coreContracts[this.configService.get('NETWORK')];
      const starknetCoreContract = StarknetCore__factory.connect(coreContractAddress, provider);
      const lastAcceptedBlockOnL1 = await starknetCoreContract.stateBlockNumber();

      this.logger.log('Last accepted block on l1', { lastAcceptedBlockOnL1 });
      this.prometheusService.lastAcceptedBlockOnL1
          .labels()
          .set(Number(lastAcceptedBlockOnL1));
      this.prometheusService.web3ProviderRequest.labels({ provider: url }).inc();

    } catch (error) {
      this.logger.warn('Last accepted block on l1', { error });
      this.prometheusService.web3ProviderRequestError.labels({ provider: url }).inc();
    }
  };
}
