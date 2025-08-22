/*
  Warnings:

  - A unique constraint covering the columns `[userId,threadId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,replyId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Vote_userId_threadId_replyId_key";

-- CreateIndex
CREATE UNIQUE INDEX "user_thread_unique" ON "public"."Vote"("userId", "threadId");

-- CreateIndex
CREATE UNIQUE INDEX "user_reply_unique" ON "public"."Vote"("userId", "replyId");
