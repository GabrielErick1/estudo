/*
  Warnings:

  - You are about to drop the column `funcionarioId` on the `ordens_de_servico` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ordens_de_servico" DROP CONSTRAINT "ordens_de_servico_funcionarioId_fkey";

-- AlterTable
ALTER TABLE "ordens_de_servico" DROP COLUMN "funcionarioId",
ADD COLUMN     "criadoPorId" TEXT;

-- AddForeignKey
ALTER TABLE "ordens_de_servico" ADD CONSTRAINT "ordens_de_servico_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "funcionarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
