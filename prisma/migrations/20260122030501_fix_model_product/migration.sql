/*
  Warnings:

  - You are about to drop the column `buyerId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_buyerId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "buyerId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
