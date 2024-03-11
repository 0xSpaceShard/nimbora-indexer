import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class _metadatas {
  @PrimaryColumn({ type: 'varchar', unique: true })
  id: string;

  @Column({ type: 'varchar' })
  value: string;
}
