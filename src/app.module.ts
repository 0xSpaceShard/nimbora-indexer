import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CheckpointModule } from './checkpoint/checkpoint.module';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/withdraws'), // TODO: Env var
        CheckpointModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
