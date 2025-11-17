-- DropForeignKey
ALTER TABLE "public"."Reply" DROP CONSTRAINT "Reply_parentReplyId_fkey";

-- AlterTable
ALTER TABLE "Reply" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_parentReplyId_fkey" FOREIGN KEY ("parentReplyId") REFERENCES "Reply"("id") ON DELETE SET NULL ON UPDATE CASCADE;
