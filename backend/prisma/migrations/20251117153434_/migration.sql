-- DropForeignKey
ALTER TABLE "public"."ThreadTag" DROP CONSTRAINT "ThreadTag_threadId_fkey";

-- AddForeignKey
ALTER TABLE "ThreadTag" ADD CONSTRAINT "ThreadTag_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;
