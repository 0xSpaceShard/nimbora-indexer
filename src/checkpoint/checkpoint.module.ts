import { Module } from '@nestjs/common';
import { CheckpointController } from './checkpoint.controller';
import { CheckpointService } from './checkpoint.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Withdraw } from 'withdraw/withdraw.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Withdraw]),
  ],
  controllers: [CheckpointController],
  providers: [CheckpointService],
})
export class CheckpointModule {
  constructor() {}
}
