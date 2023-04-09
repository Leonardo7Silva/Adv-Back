/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Offices` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Offices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offices" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Offices_email_key" ON "Offices"("email");
