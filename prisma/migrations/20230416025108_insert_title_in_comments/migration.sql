/*
  Warnings:

  - Added the required column `title` to the `Comentarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comentarios" ADD COLUMN     "title" TEXT NOT NULL;
