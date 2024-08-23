/*
  Warnings:

  - Added the required column `userId` to the `audienceLists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "audienceLists" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "audienceLists" ADD CONSTRAINT "audienceLists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
