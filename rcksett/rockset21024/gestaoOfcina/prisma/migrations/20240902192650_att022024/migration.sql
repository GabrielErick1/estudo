-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TipoFuncionario" ADD VALUE 'rh';
ALTER TYPE "TipoFuncionario" ADD VALUE 'estoque';

-- CreateTable
CREATE TABLE "ordem_estoque" (
    "id" TEXT NOT NULL,
    "ordemDeServicoId" TEXT,
    "pecaAprovada" BOOLEAN NOT NULL DEFAULT false,
    "mensagem" TEXT,
    "aprovadoPorId" TEXT,

    CONSTRAINT "ordem_estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrdemDeEstoqueRelacionada" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrdemDeEstoqueRelacionada_AB_unique" ON "_OrdemDeEstoqueRelacionada"("A", "B");

-- CreateIndex
CREATE INDEX "_OrdemDeEstoqueRelacionada_B_index" ON "_OrdemDeEstoqueRelacionada"("B");

-- AddForeignKey
ALTER TABLE "ordem_estoque" ADD CONSTRAINT "ordem_estoque_ordemDeServicoId_fkey" FOREIGN KEY ("ordemDeServicoId") REFERENCES "ordens_de_servico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordem_estoque" ADD CONSTRAINT "ordem_estoque_aprovadoPorId_fkey" FOREIGN KEY ("aprovadoPorId") REFERENCES "funcionarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrdemDeEstoqueRelacionada" ADD CONSTRAINT "_OrdemDeEstoqueRelacionada_A_fkey" FOREIGN KEY ("A") REFERENCES "ordens_de_servico"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrdemDeEstoqueRelacionada" ADD CONSTRAINT "_OrdemDeEstoqueRelacionada_B_fkey" FOREIGN KEY ("B") REFERENCES "ordem_estoque"("id") ON DELETE CASCADE ON UPDATE CASCADE;
