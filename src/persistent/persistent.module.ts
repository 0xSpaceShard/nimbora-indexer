import { Module } from '@nestjs/common';
import { PostgresPersistentService } from './persistent.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PostgresPersistentService],
  exports: [PostgresPersistentService],
})
export class PersistentModule {}
