import { Module } from '@nestjs/common';
import { CheckpointController } from './checkpoint.controller';
import { Withdraw, WithdrawSchema } from '../schemas/withdraw.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckpointService } from './checkpoint.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Withdraw.name, schema: WithdrawSchema }]),
  ],
  controllers: [CheckpointController],
  providers: [CheckpointService],
})
export class CheckpointModule {
  constructor() {}
}
