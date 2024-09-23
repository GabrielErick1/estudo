/*
  Warnings:

  - You are about to drop the column `clienteCadastrador` on the `clientes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[telefone]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "FormaPagamento" ADD VALUE 'BOLETO';

-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "clienteCadastrador";

-- AlterTable
ALTER TABLE "notificacoes" ADD COLUMN     "enviadoWhatsApp" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mensagemWhatsApp" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "clientes_telefone_key" ON "clientes"("telefone");
