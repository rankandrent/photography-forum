
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "actorCount" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "groupKey" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "notificationsSeenAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Notification_userId_groupKey_idx" ON "Notification"("userId", "groupKey");

-- CreateIndex
CREATE INDEX "Notification_userId_updatedAt_idx" ON "Notification"("userId", "updatedAt");

