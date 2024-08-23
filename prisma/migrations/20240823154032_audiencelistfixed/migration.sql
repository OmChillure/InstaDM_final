/*
  Warnings:

  - You are about to drop the column `campaignId` on the `audienceLists` table. All the data in the column will be lost.
  - You are about to drop the `_AudienceListUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `audienceUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `campaignUserInteractions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `audienceLists` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AudienceListType" AS ENUM ('CSV', 'JSON', 'FOLLOWERS', 'FOLLOWINGS', 'FROM_LIKES', 'RAW');

-- DropForeignKey
ALTER TABLE "_AudienceListUsers" DROP CONSTRAINT "_AudienceListUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_AudienceListUsers" DROP CONSTRAINT "_AudienceListUsers_B_fkey";

-- DropForeignKey
ALTER TABLE "audienceLists" DROP CONSTRAINT "audienceLists_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "campaignUserInteractions" DROP CONSTRAINT "campaignUserInteractions_audienceUserId_fkey";

-- DropForeignKey
ALTER TABLE "campaignUserInteractions" DROP CONSTRAINT "campaignUserInteractions_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "campaignUserInteractions" DROP CONSTRAINT "campaignUserInteractions_followUpVariantId_fkey";

-- DropForeignKey
ALTER TABLE "campaignUserInteractions" DROP CONSTRAINT "campaignUserInteractions_messageVariantId_fkey";

-- AlterTable
ALTER TABLE "audienceLists" DROP COLUMN "campaignId",
ADD COLUMN     "desc" TEXT,
ADD COLUMN     "parentUsernames" TEXT[],
ADD COLUMN     "type" "AudienceListType" NOT NULL,
ADD COLUMN     "userNames" TEXT[];

-- DropTable
DROP TABLE "_AudienceListUsers";

-- DropTable
DROP TABLE "audienceUsers";

-- DropTable
DROP TABLE "campaignUserInteractions";

-- DropEnum
DROP TYPE "AudienceUserType";

-- CreateTable
CREATE TABLE "_CampaignAudienceLists" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CampaignAudienceLists_AB_unique" ON "_CampaignAudienceLists"("A", "B");

-- CreateIndex
CREATE INDEX "_CampaignAudienceLists_B_index" ON "_CampaignAudienceLists"("B");

-- AddForeignKey
ALTER TABLE "_CampaignAudienceLists" ADD CONSTRAINT "_CampaignAudienceLists_A_fkey" FOREIGN KEY ("A") REFERENCES "audienceLists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignAudienceLists" ADD CONSTRAINT "_CampaignAudienceLists_B_fkey" FOREIGN KEY ("B") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;
