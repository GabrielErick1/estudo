-- AlterTable
ALTER TABLE "funcionarios" ADD COLUMN     "criadoPorId" TEXT;

-- AddForeignKey
ALTER TABLE "funcionarios" ADD CONSTRAINT "funcionarios_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "funcionarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
