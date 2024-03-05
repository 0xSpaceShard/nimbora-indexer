import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { ConfigModule, ConfigService } from 'common/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { _checkpoints } from './entities/checkpoint.entity';

@Module({
  providers: [StorageService],
  exports: [StorageService],
  imports: [
    TypeOrmModule.forFeature([_checkpoints]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL') + '/' + configService.get('DATABASE_NAME'),
        entities: [_checkpoints],
        synchronize: true,
      }),
    }),
  ],
})
export class StorageModule {}
