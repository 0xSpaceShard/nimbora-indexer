import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';
import * as path from 'path';
import * as fs from 'fs';
import Checkpoint, { LogLevel } from '@snapshot-labs/checkpoint';
import config from './config/config.json';
import * as writers from './writers/writers'
import starkgateAbi from '../abi/starkgate.json'

@Controller()
export class CheckpointController {
    private checkpoint: Checkpoint;

    constructor(private readonly appService: AppService) {
        const dir = __dirname.endsWith('dist/src') ? '../' : '';
        const schemaFile = path.join(__dirname, `${dir}../src/graphql_schema/schema.gql`);
        const schema = fs.readFileSync(schemaFile, 'utf8');
        const checkpointOptions = {
            logLevel: LogLevel.Info,
            resetOnConfigChange: true,
            abis: {
              Starkgate: starkgateAbi,
            }
          };
        this.checkpoint = new Checkpoint(config, writers, schema, checkpointOptions);

        this.checkpoint.reset().then(() => {
            this.checkpoint.start();
        });
    }
}