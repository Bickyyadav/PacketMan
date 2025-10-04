-- CreateTable
CREATE TABLE "RequestRun" (
    "id" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "statusText" TEXT,
    "headers" JSONB,
    "body" JSONB,
    "durationMs" TEXT,
    "requestId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RequestRun_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RequestRun" ADD CONSTRAINT "RequestRun_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;
