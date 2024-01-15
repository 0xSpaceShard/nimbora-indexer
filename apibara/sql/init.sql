-- Liquity Lending
CREATE TABLE "liquity_lending_batches" (
    "nonce" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "block" int NOT NULL,
    "amountEth" bigInt NOT NULL,
    "amountLusd" bigInt NOT NULL,
    "timestamp" timestamp NOT NULL,
    "_cursor" int8range,
    CONSTRAINT "liquity_lending_batches_pkey" PRIMARY KEY ("nonce")
);