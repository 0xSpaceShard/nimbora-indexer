-- CreateTable
CREATE TABLE "IndexerData" (
    "id" SERIAL NOT NULL,
    "content" JSONB NOT NULL,
    "cursor" INTEGER NOT NULL,

    CONSTRAINT "IndexerData_pkey" PRIMARY KEY ("id")
);
