/*
  Warnings:

  - You are about to drop the column `formaDePagamento` on the `ordens_de_servico` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "FormaPagamento" AS ENUM ('DINHEIRO', 'CARTAO', 'Pix');

-- AlterTable
ALTER TABLE "ordens_de_servico" DROP COLUMN "formaDePagamento";

-- DropEnum
DROP TYPE "FormaDePagamento";

-- CreateTable
CREATE TABLE "pagamentos" (
    "id" TEXT NOT NULL,
    "formaDePagamento" "FormaPagamento" NOT NULL,
    "ordemDeServicoId" TEXT NOT NULL,

    CONSTRAINT "pagamentos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_ordemDeServicoId_fkey" FOREIGN KEY ("ordemDeServicoId") REFERENCES "ordens_de_servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
