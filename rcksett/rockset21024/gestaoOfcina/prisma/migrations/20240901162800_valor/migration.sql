/*
  Warnings:

  - You are about to alter the column `valorTotal` on the `ordens_de_servico` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "ordens_de_servico" ALTER COLUMN "valorTotal" SET DATA TYPE DOUBLE PRECISION;
