-- CreateEnum
CREATE TYPE "condition" AS ENUM ('New', 'Used');

-- CreateTable
CREATE TABLE "car" (
    "id" SERIAL NOT NULL,
    "year" SMALLINT NOT NULL,
    "make" VARCHAR(30) NOT NULL,
    "model" VARCHAR(30) NOT NULL,
    "trim" VARCHAR(30) NOT NULL,
    "transmission" VARCHAR(30) NOT NULL,
    "engine" VARCHAR(30) NOT NULL,

    CONSTRAINT "car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "condition" "condition" NOT NULL,
    "msrp" INTEGER NOT NULL,
    "down_payment" INTEGER NOT NULL,
    "tax" INTEGER NOT NULL,
    "market_adjustment" INTEGER NOT NULL,
    "doc_fee" INTEGER NOT NULL,
    "options" TEXT,
    "image_id" INTEGER NOT NULL,
    "purchase_date" DATE NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
