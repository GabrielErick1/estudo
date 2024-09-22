import { prisma } from "@/lib/prisma";
import { InterfaceAccount } from "../IUserRepository";
import { RegisterInterface } from "@/domain/usecases/IRegisterUser";
import { Cliente, TipoCliente } from "@prisma/client";

export class PrismaUserRepository implements InterfaceAccount {
  private repositories = prisma;
  async FindByCnpj(cnpj: string): Promise<Cliente | null> {
   return await this.repositories.cliente.findUnique({
    where: {cnpj}
  })
  }
 async FindByCpf(cpf: string): Promise<Cliente | null> {
  return await this.repositories.cliente.findUnique({
    where: {cpf}
  })
  }
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
      }
    });
  }

  async FindByEmail(email: string): Promise<Cliente | null> {
    return prisma.cliente.findUnique({
      where: { email },
    });
  }
}
