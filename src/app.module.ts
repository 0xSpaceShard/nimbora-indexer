import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CheckpointModule } from './checkpoint/checkpoint.module';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Withdraw } from 'withdraw/withdraw.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

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
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            typePaths: ['./**/*.graphql'],
            definitions: {
                path: './src/graphql.ts',
                outputAs: 'class',
            },
        }), 
        CheckpointModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
