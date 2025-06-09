/*
  Warnings:

  - A unique constraint covering the columns `[userId,bulan]` on the table `RekapHasil` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "RekapHasil_userId_key";

-- AlterTable
ALTER TABLE "RekapHasil" ADD COLUMN     "bulan" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "RekapHasil_userId_bulan_key" ON "RekapHasil"("userId", "bulan");
