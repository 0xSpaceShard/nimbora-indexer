import { Module } from '@nestjs/common';
import { AppService } from '../app.service';
import { CheckpointController } from './checkpoint.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql_schema'),
        outputAs: 'class',
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql', // or 'mariadb'
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'checkpoint',
      entities: [],
      synchronize: false,
    }),
  ],
  controllers: [CheckpointController],
  providers: [AppService],
})
export class CheckpointModule {
  constructor(private dataSource: DataSource) {}
}
