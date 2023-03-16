/*
  Warnings:

  - You are about to drop the column `title` on the `Todo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[task]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `task` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Todo_title_key";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "title",
ADD COLUMN     "task" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Todo_task_key" ON "Todo"("task");
