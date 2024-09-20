-- CreateEnum
CREATE TYPE "TipoCliente" AS ENUM ('COMUM');

-- CreateEnum
CREATE TYPE "TipoFuncionario" AS ENUM ('super_admin', 'moderador', 'admin', 'funcionario');

-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "email" TEXT NOT NULL,
    "placaDoCarro" TEXT,
    "dataDeUltimaRevisao" TIMESTAMP(3),
    "tipo" "TipoCliente" NOT NULL DEFAULT 'COMUM',
    "clienteCadastrador" TEXT,
    "criadoPorId" TEXT,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funcionarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" "TipoFuncionario" NOT NULL,

    CONSTRAINT "funcionarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carros" (
    "id" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "clienteId" TEXT NOT NULL,

    CONSTRAINT "carros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicos" (
    "id" TEXT NOT NULL,
    "tipoDeServico" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "servicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pecas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "criadoPorId" TEXT NOT NULL,

    CONSTRAINT "pecas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordens_de_servico" (
    "id" TEXT NOT NULL,
    "placaDoCarro" TEXT NOT NULL,
    "servicosPrestados" TEXT NOT NULL,
    "pecasUsadas" TEXT NOT NULL,
    "valorTotal" DECIMAL(65,30) NOT NULL,
    "dataDeRealizacao" TIMESTAMP(3) NOT NULL,
    "dataDeVencimento" TIMESTAMP(3) NOT NULL,
    "clienteId" TEXT NOT NULL,
    "funcionarioId" TEXT,
    "servicoId" TEXT,
    "aprovado" BOOLEAN NOT NULL DEFAULT false,
    "aprovadoPorId" TEXT,

    CONSTRAINT "ordens_de_servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revisoes" (
    "id" TEXT NOT NULL,
    "placaDoCarro" TEXT NOT NULL,
    "dataDaRevisao" TIMESTAMP(3) NOT NULL,
    "dataDaProximaRevisao" TIMESTAMP(3) NOT NULL,
    "mensagemPredefinida" TEXT,
    "carroId" TEXT NOT NULL,
    "clienteId" TEXT,

    CONSTRAINT "revisoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "funcionarios_username_key" ON "funcionarios"("username");

-- CreateIndex
CREATE UNIQUE INDEX "funcionarios_email_key" ON "funcionarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "carros_placa_key" ON "carros"("placa");

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "funcionarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carros" ADD CONSTRAINT "carros_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pecas" ADD CONSTRAINT "pecas_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "funcionarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens_de_servico" ADD CONSTRAINT "ordens_de_servico_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens_de_servico" ADD CONSTRAINT "ordens_de_servico_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "funcionarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens_de_servico" ADD CONSTRAINT "ordens_de_servico_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "servicos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens_de_servico" ADD CONSTRAINT "ordens_de_servico_aprovadoPorId_fkey" FOREIGN KEY ("aprovadoPorId") REFERENCES "funcionarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revisoes" ADD CONSTRAINT "revisoes_carroId_fkey" FOREIGN KEY ("carroId") REFERENCES "carros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revisoes" ADD CONSTRAINT "revisoes_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
