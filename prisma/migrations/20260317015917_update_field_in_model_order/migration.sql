/*
  Warnings:

  - You are about to alter the column `totalAmount` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - Added the required column `receiverName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverPhone` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipppingAddress` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "note" TEXT,
ADD COLUMN     "receiverName" TEXT NOT NULL,
ADD COLUMN     "receiverPhone" TEXT NOT NULL,
ADD COLUMN     "shipppingAddress" TEXT NOT NULL,
ALTER COLUMN "totalAmount" SET DATA TYPE DECIMAL(10,2);
