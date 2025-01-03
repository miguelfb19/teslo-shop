/*
  Warnings:

  - The primary key for the `Country` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `indicative` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Country" DROP CONSTRAINT "Country_pkey",
ADD COLUMN     "indicative" TEXT NOT NULL,
ADD CONSTRAINT "Country_pkey" PRIMARY KEY ("id");
