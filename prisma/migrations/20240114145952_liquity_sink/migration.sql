/*
  Warnings:

  - You are about to drop the `IndexerData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "IndexerData";

-- CreateTable
CREATE TABLE "liquity_lending_batches" (
    "nonce" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "amountEth" TEXT NOT NULL,
    "amountLusd" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "_cursor" INTEGER NOT NULL,

    CONSTRAINT "liquity_lending_batches_pkey" PRIMARY KEY ("nonce")
);

-- CreateTable
CREATE TABLE "sink_metadata" (
    "sink" TEXT NOT NULL,
    "cursor" INTEGER NOT NULL,
    "filter" TEXT NOT NULL,

    CONSTRAINT "sink_metadata_pkey" PRIMARY KEY ("sink")
);
