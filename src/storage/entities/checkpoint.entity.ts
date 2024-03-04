import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class _checkpoints {
  @PrimaryColumn({ type: 'varchar', unique: true })
  id: string;

  @Column()
  block_number: number;

  @Column({ type: 'varchar' })
  contract_address: string;
}
