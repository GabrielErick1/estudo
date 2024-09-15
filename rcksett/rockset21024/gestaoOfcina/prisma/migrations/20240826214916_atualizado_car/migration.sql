/*
  Warnings:

  - Added the required column `formaDePagamento` to the `ordens_de_servico` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FormaDePagamento" AS ENUM ('DINHEIRO', 'CARTAO', 'Pix');

-- AlterTable
ALTER TABLE "ordens_de_servico" ADD COLUMN     "formaDePagamento" "FormaDePagamento" NOT NULL;
