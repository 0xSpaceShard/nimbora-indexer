import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CheckpointModule } from './checkpoint/checkpoint.module';
import { AppService } from './app.service';

@Module({
    imports: [CheckpointModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
