/*
  Warnings:

  - The primary key for the `Country` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Country" DROP CONSTRAINT "Country_pkey",
ADD CONSTRAINT "Country_pkey" PRIMARY KEY ("code");
