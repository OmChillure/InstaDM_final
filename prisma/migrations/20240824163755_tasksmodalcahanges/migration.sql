-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_listId_fkey";

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "campaignId" DROP NOT NULL,
ALTER COLUMN "listId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_listId_fkey" FOREIGN KEY ("listId") REFERENCES "audienceLists"("id") ON DELETE SET NULL ON UPDATE CASCADE;
