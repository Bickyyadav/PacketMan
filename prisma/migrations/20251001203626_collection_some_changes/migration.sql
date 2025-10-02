/*
  Warnings:

  - You are about to drop the column `workspaceMemberId` on the `Collection` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Collection" DROP CONSTRAINT "Collection_workspaceMemberId_fkey";

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "workspaceMemberId",
ADD COLUMN     "workspaceId" TEXT;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE SET NULL ON UPDATE CASCADE;
