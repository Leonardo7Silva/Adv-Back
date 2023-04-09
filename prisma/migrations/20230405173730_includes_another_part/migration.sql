/*
  Warnings:

  - You are about to drop the column `AdvogadoId` on the `Processos` table. All the data in the column will be lost.
  - You are about to drop the column `ClientId` on the `Processos` table. All the data in the column will be lost.
  - Added the required column `advogadoId` to the `Processos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anotherPartDoc` to the `Processos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anotherPartName` to the `Processos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `Processos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Processos" DROP CONSTRAINT "Processos_fk0";

-- DropForeignKey
ALTER TABLE "Processos" DROP CONSTRAINT "Processos_fk1";

-- AlterTable
ALTER TABLE "Processos" DROP COLUMN "AdvogadoId",
DROP COLUMN "ClientId",
ADD COLUMN     "advogadoId" INTEGER NOT NULL,
ADD COLUMN     "anotherPartDoc" TEXT NOT NULL,
ADD COLUMN     "anotherPartName" TEXT NOT NULL,
ADD COLUMN     "clientId" INTEGER NOT NULL,
ALTER COLUMN "limitTime" DROP NOT NULL,
ALTER COLUMN "limitTimeDesc" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Processos" ADD CONSTRAINT "Processos_fk0" FOREIGN KEY ("clientId") REFERENCES "Clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Processos" ADD CONSTRAINT "Processos_fk1" FOREIGN KEY ("advogadoId") REFERENCES "Advogados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
