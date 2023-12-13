import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';
import * as path from 'path';
import * as fs from 'fs';
import Checkpoint, { LogLevel } from '@snapshot-labs/checkpoint';
import config from './config/config.json';
import { CheckpointWriters } from './writers/writers';
import starkgateAbi from '../abi/starkgate.json'
import { CheckpointService } from './checkpoint.service';

@Controller()
export class CheckpointController {
    private checkpoint: Checkpoint;

    constructor(private readonly CheckpointService: CheckpointService) {
        const schema = "";
        const checkpointOptions = {
            logLevel: LogLevel.Info,
            resetOnConfigChange: true,
            abis: {
              Starkgate: starkgateAbi,
            }
          };
        const writers = new CheckpointWriters(this.CheckpointService);
        this.checkpoint = new Checkpoint(config, writers.writers(), schema, checkpointOptions);

        this.checkpoint.reset().then(() => {
            this.checkpoint.start();
        });
    }


}