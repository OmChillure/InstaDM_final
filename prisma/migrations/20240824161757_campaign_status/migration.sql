-- CreateEnum
CREATE TYPE "CampignStatus" AS ENUM ('CREATED', 'LAUNCHED', 'PENDING', 'COMPLETED', 'REJECTED');

-- AlterTable
ALTER TABLE "campaigns" ADD COLUMN     "status" "CampignStatus" NOT NULL DEFAULT 'CREATED';
