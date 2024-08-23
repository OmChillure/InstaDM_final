/*
  Warnings:

  - You are about to drop the column `endingHour` on the `campaigns` table. All the data in the column will be lost.
  - You are about to drop the column `startingHour` on the `campaigns` table. All the data in the column will be lost.
  - The `messagesPerDay` column on the `campaigns` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "campaigns" DROP COLUMN "endingHour",
DROP COLUMN "startingHour",
ADD COLUMN     "workingHours" INTEGER[],
DROP COLUMN "messagesPerDay",
ADD COLUMN     "messagesPerDay" INTEGER[];
