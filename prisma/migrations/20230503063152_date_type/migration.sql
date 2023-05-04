/*
  Warnings:

  - You are about to drop the column `down_payment` on the `post` table. All the data in the column will be lost.
  - Added the required column `discount` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "down_payment",
ADD COLUMN     "discount" INTEGER NOT NULL,
ALTER COLUMN "purchase_date" SET DATA TYPE TIMESTAMP(3);
