/*
  Warnings:

  - You are about to drop the column `senha` on the `clientes` table. All the data in the column will be lost.
  - Added the required column `password` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Made the column `dataDeNascimento` on table `funcionarios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "senha",
ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "funcionarios" ALTER COLUMN "dataDeNascimento" SET NOT NULL;
