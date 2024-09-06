-- AlterEnum
ALTER TYPE "TipoFuncionario" ADD VALUE 'funcionario';

-- AlterTable
ALTER TABLE "funcionarios" ADD COLUMN     "telefone" TEXT;
