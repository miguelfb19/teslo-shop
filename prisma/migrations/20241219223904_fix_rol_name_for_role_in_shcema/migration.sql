/*
  Warnings:

  - You are about to drop the column `rol` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "rol",
ADD COLUMN     "role" "Rol" NOT NULL DEFAULT 'user';
