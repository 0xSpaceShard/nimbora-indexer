import { Module } from '@nestjs/common';
import { CheckpointService } from './checkpoint.service.ts';
import { CheckpointController } from './checkpoint.controller';
import { DataSource } from 'typeorm';
import { Withdraw, WithdrawSchema } from '../schemas/withdraw.schema.ts';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Withdraw.name, schema: WithdrawSchema }]),
  ],
  controllers: [CheckpointController],
  providers: [CheckpointService],
})
export class CheckpointModule {
  constructor(private dataSource: DataSource) {}
}
