-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('MESSAGE', 'FOLLOW_UP');

-- CreateEnum
CREATE TYPE "AudienceUserType" AS ENUM ('ACCOUNT_FOLLOWER', 'FROM_COMMENT', 'FROM_LIKES');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaigns" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startingHour" TEXT NOT NULL,
    "endingHour" TEXT NOT NULL,
    "messagesPerDay" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audienceLists" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "campaignId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "audienceLists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audienceUsers" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "type" "AudienceUserType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "audienceUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messageVariants" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "variables" TEXT[],
    "parentMessageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messageVariants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "followUps" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "followUps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "followUpVariants" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "variables" TEXT[],
    "followUpId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "followUpVariants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaignUserInteractions" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "audienceUserId" TEXT NOT NULL,
    "messageVariantId" TEXT,
    "followUpVariantId" TEXT,
    "interactionType" "InteractionType" NOT NULL,
    "followUpStep" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaignUserInteractions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AudienceListUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_AudienceListUsers_AB_unique" ON "_AudienceListUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_AudienceListUsers_B_index" ON "_AudienceListUsers"("B");

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audienceLists" ADD CONSTRAINT "audienceLists_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messageVariants" ADD CONSTRAINT "messageVariants_parentMessageId_fkey" FOREIGN KEY ("parentMessageId") REFERENCES "messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "followUps" ADD CONSTRAINT "followUps_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "followUpVariants" ADD CONSTRAINT "followUpVariants_followUpId_fkey" FOREIGN KEY ("followUpId") REFERENCES "followUps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaignUserInteractions" ADD CONSTRAINT "campaignUserInteractions_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaignUserInteractions" ADD CONSTRAINT "campaignUserInteractions_audienceUserId_fkey" FOREIGN KEY ("audienceUserId") REFERENCES "audienceUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaignUserInteractions" ADD CONSTRAINT "campaignUserInteractions_messageVariantId_fkey" FOREIGN KEY ("messageVariantId") REFERENCES "messageVariants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaignUserInteractions" ADD CONSTRAINT "campaignUserInteractions_followUpVariantId_fkey" FOREIGN KEY ("followUpVariantId") REFERENCES "followUpVariants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AudienceListUsers" ADD CONSTRAINT "_AudienceListUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "audienceLists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AudienceListUsers" ADD CONSTRAINT "_AudienceListUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "audienceUsers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
