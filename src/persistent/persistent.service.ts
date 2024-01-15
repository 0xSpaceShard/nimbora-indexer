import { Injectable } from '@nestjs/common';
import { IPersistent } from './persistent.interface';
import { PrismaService } from 'prisma/prisma.service';
import { SinkPersistentMetadata } from 'types';

@Injectable()
export class PostgresPersistentService implements IPersistent {
  constructor(private prismaService: PrismaService) {}

  async setState(sinkPersistentMetadata: SinkPersistentMetadata): Promise<void> {
    const { cursor, filter, sink } = sinkPersistentMetadata;
    await this.prismaService.sink_metadata.upsert({
      where: { sink },
      create: { sink, cursor, filter },
      update: { cursor, filter },
    });
  }

  async getState(sink: string): Promise<SinkPersistentMetadata> {
    return await this.prismaService.sink_metadata.findFirst({ where: { sink } });
  }

  async deleteState(sink: string): Promise<void> {
    await this.prismaService.sink_metadata.delete({ where: { sink } });
  }
}
