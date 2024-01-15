import { Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';

@Injectable()
export class CronService {
  @Timeout(5000)
  async runIndexer() {
    return;
  }
}
