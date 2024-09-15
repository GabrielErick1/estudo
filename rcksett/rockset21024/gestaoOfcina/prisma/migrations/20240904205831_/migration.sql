/*
  Warnings:

  - The values [Pix] on the enum `FormaPagamento` will be removed. If these variants are still used in the database, this will fail.
  - The values [funcionario] on the enum `TipoFuncionario` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `pecasUsadas` on the `ordens_de_servico` table. All the data in the column will be lost.
  - You are about to drop the column `ordemDeServicoId` on the `pagamentos` table. All the data in the column will be lost.
  - You are about to drop the `_OrdemDeEstoqueRelacionada` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cnpj]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ordemDeServicoId]` on the table `ordem_estoque` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "StatusOrdem" AS ENUM ('EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "TipoNotificacao" AS ENUM ('REVISAO', 'ORDEM_SERVICO', 'PROMOCAO');

-- AlterEnum
BEGIN;
CREATE TYPE "FormaPagamento_new" AS ENUM ('DINHEIRO', 'CARTAO', 'PIX');
ALTER TABLE "pagamentos" ALTER COLUMN "formaDePagamento" TYPE "FormaPagamento_new" USING ("formaDePagamento"::text::"FormaPagamento_new");
ALTER TYPE "FormaPagamento" RENAME TO "FormaPagamento_old";
ALTER TYPE "FormaPagamento_new" RENAME TO "FormaPagamento";
DROP TYPE "FormaPagamento_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TipoFuncionario_new" AS ENUM ('super_admin', 'moderador', 'admin', 'rh', 'estoque');
ALTER TABLE "funcionarios" ALTER COLUMN "tipo" TYPE "TipoFuncionario_new" USING ("tipo"::text::"TipoFuncionario_new");
ALTER TYPE "TipoFuncionario" RENAME TO "TipoFuncionario_old";
ALTER TYPE "TipoFuncionario_new" RENAME TO "TipoFuncionario";
DROP TYPE "TipoFuncionario_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "_OrdemDeEstoqueRelacionada" DROP CONSTRAINT "_OrdemDeEstoqueRelacionada_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrdemDeEstoqueRelacionada" DROP CONSTRAINT "_OrdemDeEstoqueRelacionada_B_fkey";

-- DropForeignKey
ALTER TABLE "pagamentos" DROP CONSTRAINT "pagamentos_ordemDeServicoId_fkey";

-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "cnpj" TEXT,
ALTER COLUMN "cpf" DROP NOT NULL,
ALTER COLUMN "dataDeNascimento" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ordens_de_servico" DROP COLUMN "pecasUsadas",
ADD COLUMN     "status" "StatusOrdem" NOT NULL DEFAULT 'EM_ANDAMENTO';

-- AlterTable
ALTER TABLE "pagamentos" DROP COLUMN "ordemDeServicoId";

-- DropTable
DROP TABLE "_OrdemDeEstoqueRelacionada";

-- CreateTable
CREATE TABLE "ordem_servico_pagamento" (
    "id" TEXT NOT NULL,
    "ordemDeServicoId" TEXT NOT NULL,
    "pagamentoId" TEXT NOT NULL,

    CONSTRAINT "ordem_servico_pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notificacoes" (
    "id" TEXT NOT NULL,
    "tipo" "TipoNotificacao" NOT NULL,
    "mensagem" TEXT NOT NULL,
    "enviadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clienteId" TEXT NOT NULL,
    "revisaoId" TEXT,
    "ordemServicoId" TEXT,
    "promocaoId" TEXT,

    CONSTRAINT "notificacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promocoes" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "desconto" DOUBLE PRECISION NOT NULL,
    "servicoId" TEXT,

    CONSTRAINT "promocoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PecasUsadasNasOrdens" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PecasUsadasNasOrdens_AB_unique" ON "_PecasUsadasNasOrdens"("A", "B");

-- CreateIndex
CREATE INDEX "_PecasUsadasNasOrdens_B_index" ON "_PecasUsadasNasOrdens"("B");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cnpj_key" ON "clientes"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "ordem_estoque_ordemDeServicoId_key" ON "ordem_estoque"("ordemDeServicoId");

-- AddForeignKey
ALTER TABLE "ordem_servico_pagamento" ADD CONSTRAINT "ordem_servico_pagamento_ordemDeServicoId_fkey" FOREIGN KEY ("ordemDeServicoId") REFERENCES "ordens_de_servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordem_servico_pagamento" ADD CONSTRAINT "ordem_servico_pagamento_pagamentoId_fkey" FOREIGN KEY ("pagamentoId") REFERENCES "pagamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificacoes" ADD CONSTRAINT "notificacoes_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificacoes" ADD CONSTRAINT "notificacoes_promocaoId_fkey" FOREIGN KEY ("promocaoId") REFERENCES "promocoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificacoes" ADD CONSTRAINT "notificacoes_revisaoId_fkey" FOREIGN KEY ("revisaoId") REFERENCES "revisoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notificacoes" ADD CONSTRAINT "notificacoes_ordemServicoId_fkey" FOREIGN KEY ("ordemServicoId") REFERENCES "ordens_de_servico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promocoes" ADD CONSTRAINT "promocoes_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "servicos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PecasUsadasNasOrdens" ADD CONSTRAINT "_PecasUsadasNasOrdens_A_fkey" FOREIGN KEY ("A") REFERENCES "ordens_de_servico"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PecasUsadasNasOrdens" ADD CONSTRAINT "_PecasUsadasNasOrdens_B_fkey" FOREIGN KEY ("B") REFERENCES "pecas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
