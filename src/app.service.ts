import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
    constructor(private dataSource: DataSource) {}

    async getWithdrawals() {
        const withdrawals = await this.dataSource.query('SELECT * FROM withdrawals');
        return withdrawals;
    }
}
