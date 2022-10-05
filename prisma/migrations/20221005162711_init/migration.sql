/*
  Warnings:

  - Added the required column `city` to the `activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activity" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL;
