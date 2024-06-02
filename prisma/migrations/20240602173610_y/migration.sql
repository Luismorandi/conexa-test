/*
  Warnings:

  - You are about to drop the column `opening_crawl` on the `Movies` table. All the data in the column will be lost.
  - Added the required column `description` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movies" DROP COLUMN "opening_crawl",
ADD COLUMN     "description" TEXT NOT NULL;
