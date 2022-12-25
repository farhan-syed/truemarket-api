/*
  Warnings:

  - You are about to drop the column `doc_fee` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `image_id` on the `post` table. All the data in the column will be lost.
  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fees` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_image_id_fkey";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "doc_fee",
DROP COLUMN "image_id",
ADD COLUMN     "fees" INTEGER NOT NULL,
ADD COLUMN     "image_url" VARCHAR;

-- DropTable
DROP TABLE "image";
