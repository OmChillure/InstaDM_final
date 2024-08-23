/*
  Warnings:

  - The values [FROM_LIKES] on the enum `AudienceListType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AudienceListType_new" AS ENUM ('CSV', 'JSON', 'FOLLOWERS', 'FOLLOWINGS', 'LIKES', 'RAW');
ALTER TABLE "audienceLists" ALTER COLUMN "type" TYPE "AudienceListType_new" USING ("type"::text::"AudienceListType_new");
ALTER TYPE "AudienceListType" RENAME TO "AudienceListType_old";
ALTER TYPE "AudienceListType_new" RENAME TO "AudienceListType";
DROP TYPE "AudienceListType_old";
COMMIT;
