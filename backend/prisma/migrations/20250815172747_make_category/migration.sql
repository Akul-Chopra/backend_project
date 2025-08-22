/*
  Warnings:

  - Made the column `categoryId` on table `Thread` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Thread" DROP CONSTRAINT "Thread_categoryId_fkey";

-- AlterTable
ALTER TABLE "public"."Thread" ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Thread" ADD CONSTRAINT "Thread_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
