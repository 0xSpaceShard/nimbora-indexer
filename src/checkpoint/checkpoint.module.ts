import { Module } from '@nestjs/common';
import { CheckpointController } from './checkpoint.controller';
import { Withdraw, WithdrawSchema } from '../schemas/withdraw.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from 'app.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Withdraw.name, schema: WithdrawSchema }]),
  ],
  controllers: [CheckpointController],
  providers: [AppService],
})
export class CheckpointModule {
  constructor() {}
}
