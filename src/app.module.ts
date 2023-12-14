import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CheckpointModule } from './checkpoint/checkpoint.module';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Withdraw } from 'withdraw/withdraw.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: process.env.DB_TYPE as any,
            host: process.env.DATABASE_HOST as string,
            port: process.env.DATABASE_PORT as any,
            username: process.env.DATABASE_USERNAME as string,
            password: process.env.DATABASE_PASSWORD as string,
            database: process.env.DATABASE_NAME as string,
            entities: [Withdraw],
            synchronize: true,
        }),
        CheckpointModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
