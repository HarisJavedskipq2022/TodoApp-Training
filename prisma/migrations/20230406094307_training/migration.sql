/*
  Warnings:

  - You are about to drop the column `deleted` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "deleted";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "deleted";
