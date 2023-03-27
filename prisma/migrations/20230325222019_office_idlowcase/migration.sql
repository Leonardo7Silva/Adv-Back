/*
  Warnings:

  - You are about to drop the column `OfficeId` on the `Clientes` table. All the data in the column will be lost.
  - Added the required column `officeId` to the `Clientes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Clientes" DROP CONSTRAINT "Clientes_fk0";

-- AlterTable
ALTER TABLE "Clientes" DROP COLUMN "OfficeId",
ADD COLUMN     "officeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Clientes" ADD CONSTRAINT "Clientes_fk0" FOREIGN KEY ("officeId") REFERENCES "Offices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
