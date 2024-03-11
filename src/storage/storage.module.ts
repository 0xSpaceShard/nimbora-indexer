import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { ConfigModule, ConfigService } from 'common/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { _checkpoints } from './entities/checkpoint.entity';
import { _metadatas } from './entities/metadata.entity';

@Module({
  providers: [StorageService],
  exports: [StorageService],
  imports: [
    TypeOrmModule.forFeature([_checkpoints, _metadatas]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL') + '/' + configService.get('DATABASE_NAME'),
        entities: [_checkpoints, _metadatas],
        synchronize: true,
      }),
    }),
  ],
})
export class StorageModule {}
