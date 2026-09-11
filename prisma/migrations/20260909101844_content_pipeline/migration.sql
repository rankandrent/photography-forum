
-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('QUEUED', 'DRAFTED', 'PUBLISHED', 'FAILED', 'SKIPPED');

-- CreateTable
CREATE TABLE "KeywordTarget" (
    "id" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "volume" INTEGER,
    "difficulty" INTEGER,
    "trafficPotential" INTEGER,
    "cluster" TEXT,
    "serpFeatures" TEXT NOT NULL DEFAULT '',
    "categorySlug" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'QUEUED',
    "priority" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KeywordTarget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentDraft" (
    "id" TEXT NOT NULL,
    "keywordId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "tags" TEXT NOT NULL DEFAULT '',
    "kind" "ThreadKind" NOT NULL DEFAULT 'DISCUSSION',
    "categoryId" TEXT NOT NULL,
    "sources" TEXT NOT NULL DEFAULT '[]',
    "model" TEXT NOT NULL,
    "inputTokens" INTEGER,
    "outputTokens" INTEGER,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFTED',
    "threadId" TEXT,
    "threadSlug" TEXT,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "ContentDraft_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KeywordTarget_keyword_key" ON "KeywordTarget"("keyword");

-- CreateIndex
CREATE INDEX "KeywordTarget_status_priority_idx" ON "KeywordTarget"("status", "priority");

-- CreateIndex
CREATE INDEX "ContentDraft_status_createdAt_idx" ON "ContentDraft"("status", "createdAt");

-- AddForeignKey
ALTER TABLE "ContentDraft" ADD CONSTRAINT "ContentDraft_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "KeywordTarget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

