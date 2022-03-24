/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `film` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `film` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "film" ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "film_url_key" ON "film"("url");
