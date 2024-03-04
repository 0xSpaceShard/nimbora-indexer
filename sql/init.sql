-- yielddex_deposit
CREATE INDEX IF NOT EXISTS yielddex_deposit_l1strategy ON yielddex_deposit(l1Strategy);
CREATE INDEX IF NOT EXISTS yielddex_deposit_receiver ON yielddex_deposit(receiver);
CREATE INDEX IF NOT EXISTS yielddex_deposit_timestamp ON yielddex_deposit("timestamp");

-- yieldDex_tm_transfer
CREATE INDEX IF NOT EXISTS yieldDex_tm_transfer_constractaddress ON yielddex_deposit(constractAddress);
CREATE INDEX IF NOT EXISTS yieldDex_tm_transfer_from ON yielddex_deposit("from");
CREATE INDEX IF NOT EXISTS yieldDex_tm_transfer_to ON yielddex_deposit("to");
CREATE INDEX IF NOT EXISTS yieldDex_tm_transfer_timestamp ON yielddex_deposit("timestamp");

-- Set _checkpoints id not null
ALTER TABLE "_checkpoints" ADD "id" character varying NOT NULL