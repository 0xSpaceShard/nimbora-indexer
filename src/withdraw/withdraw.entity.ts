import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Withdraw{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    amount: string;

    @Column()
    l1_recipient: string;

    @Column()
    caller_address: string;

    @Column()
    created_at: number;

    @Column()
    created_at_block: number;
}