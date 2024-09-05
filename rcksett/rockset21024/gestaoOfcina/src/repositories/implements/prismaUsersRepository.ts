import { prisma } from "@/lib/prisma";
import { InterfaceAccount } from "../IUserRepository";
import { RegisterInterface } from "@/domain/usecases/IRegisterUser";
import { Cliente, TipoCliente } from "@prisma/client";

export class PrismaUserRepository implements InterfaceAccount {
  async CreateAccount(data: RegisterInterface): Promise<Cliente> {
    const ordensDeServicoData = data.ordensDeServico?.map(ordem => ({
      ...ordem,
      criadoPorId: ordem.criadoPorId ?? undefined,
      aprovadoPorId: ordem.aprovadoPorId ?? undefined,
    }));

    return prisma.cliente.create({
      data: {
        nome: data.nome,
        email: data.email,
        dataDeNascimento: data.dataDeNascimento || undefined,
        cpf: data.cpf || undefined,
        cnpj: data.cnpj || undefined,
        password: data.password,
        telefone: data.telefone ?? null,
        clienteCadastrador: data.clienteCadastrador ?? null,
        criadoPorId: data.criadoPorId ?? null,
        tipo: data.tipo ?? TipoCliente.COMUM, // Define "COMUM" como padrão

        carros: data.carros && data.carros.length > 0 ? {
          createMany: {
            data: data.carros.map(carro => ({
              ...carro,
              clienteId: data.id, // Ajuste conforme o relacionamento
            })),
          },
        } : undefined,

        ordensDeServico: ordensDeServicoData && ordensDeServicoData.length > 0 ? {
          createMany: {
            data: ordensDeServicoData,
          },
        } : undefined,

        revisoes: data.revisoes && data.revisoes.length > 0 ? {
          createMany: {
            data: data.revisoes,
          },
        } : undefined,
      },
      include: {
        ordensDeServico: true,
        carros: true,
        revisoes: true,
      },
    });
  }

  async FindByEmail(email: string): Promise<Cliente | null> {
    return prisma.cliente.findUnique({
      where: { email },
    });
  }
}
