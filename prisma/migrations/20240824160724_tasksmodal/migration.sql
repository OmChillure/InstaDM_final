-- CreateEnum
CREATE TYPE "TasksType" AS ENUM ('GET_FOLLOWERS', 'GET_FOLLOWINGS', 'START_CAMPAIGNING', 'GET_LIKES');

-- CreateEnum
CREATE TYPE "TasksStatus" AS ENUM ('NOT_STARTED', 'PENDING', 'COMPLETED');

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "type" "TasksType" NOT NULL,
    "status" "TasksStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "campaignId" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tasks_campaignId_key" ON "tasks"("campaignId");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_listId_key" ON "tasks"("listId");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_listId_fkey" FOREIGN KEY ("listId") REFERENCES "audienceLists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
