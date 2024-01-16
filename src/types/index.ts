import Checkpoint, {
  AsyncMySqlPool,
  ContractSourceConfig,
  FullBlock,
  ParsedEvent,
  Transaction,
} from '@snapshot-labs/checkpoint';
import { Pool as PgPool } from 'pg';

export interface CheckpointWriter {
  tx: Transaction;
  block: FullBlock | null;
  event?: ParsedEvent;
  rawEvent?: Event;
  eventIndex?: number;
  source?: ContractSourceConfig;
  mysql: AsyncMySqlPool;
  pg: PgPool;
  instance: Checkpoint;
}
