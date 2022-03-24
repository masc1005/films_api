/*
  Warnings:

  - You are about to drop the `item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_userId_fkey";

-- DropTable
DROP TABLE "item";

-- CreateTable
CREATE TABLE "gender" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "gender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "film" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sinopse" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "genderId" INTEGER NOT NULL,

    CONSTRAINT "film_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "film_name_key" ON "film"("name");

-- CreateIndex
CREATE UNIQUE INDEX "film_userId_key" ON "film"("userId");

-- AddForeignKey
ALTER TABLE "film" ADD CONSTRAINT "film_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film" ADD CONSTRAINT "film_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "gender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
