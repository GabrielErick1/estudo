/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `funcionarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataDeNascimento` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `funcionarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataDeNascimento` to the `funcionarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `ordens_de_servico` table without a default value. This is not possible if the table is not empty.
  - Made the column `criadoPorId` on table `ordens_de_servico` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ordens_de_servico" DROP CONSTRAINT "ordens_de_servico_criadoPorId_fkey";

-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "dataDeNascimento" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "funcionarios" ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "dataDeNascimento" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ordens_de_servico" ADD COLUMN     "cpf" TEXT NOT NULL,
ALTER COLUMN "criadoPorId" SET NOT NULL;

-- CreateTable
CREATE TABLE "_ServicosExecutadosPorFuncionarios" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ServicosExecutadosPorFuncionarios_AB_unique" ON "_ServicosExecutadosPorFuncionarios"("A", "B");

-- CreateIndex
CREATE INDEX "_ServicosExecutadosPorFuncionarios_B_index" ON "_ServicosExecutadosPorFuncionarios"("B");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cpf_key" ON "clientes"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "funcionarios_cpf_key" ON "funcionarios"("cpf");

-- AddForeignKey
ALTER TABLE "ordens_de_servico" ADD CONSTRAINT "ordens_de_servico_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "funcionarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServicosExecutadosPorFuncionarios" ADD CONSTRAINT "_ServicosExecutadosPorFuncionarios_A_fkey" FOREIGN KEY ("A") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServicosExecutadosPorFuncionarios" ADD CONSTRAINT "_ServicosExecutadosPorFuncionarios_B_fkey" FOREIGN KEY ("B") REFERENCES "funcionarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
