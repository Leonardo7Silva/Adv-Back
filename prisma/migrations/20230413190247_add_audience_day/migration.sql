/*
  Warnings:

  - Added the required column `officeId` to the `Processos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Processos" ADD COLUMN     "audienceDay" TIMESTAMP(3),
ADD COLUMN     "officeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Processos" ADD CONSTRAINT "Processos_fk2" FOREIGN KEY ("officeId") REFERENCES "Offices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
