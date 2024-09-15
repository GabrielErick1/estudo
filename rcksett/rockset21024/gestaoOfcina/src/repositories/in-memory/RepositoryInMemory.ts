import { Cliente } from "@prisma/client";
import { InterfaceAccount } from "../IUserRepository";
import { RegisterInterface, TipoCliente } from "@/domain/usecases/IRegisterUser";

export class RepositoryInMemory implements InterfaceAccount {
  private items: RegisterInterface[] = [];

  async CreateAccount(data: RegisterInterface): Promise<Cliente> {
    const user: RegisterInterface = {
      id: data.id || `user-${this.items.length + 1}`,  // Usando o ID passado ou gerando um automaticamente
      nome: data.nome,
      email: data.email,
      password: data.password,
      telefone: data.telefone,
      cpf: data.cpf,
      dataDeNascimento: data.dataDeNascimento,
      dataDeUltimaRevisao: data.dataDeUltimaRevisao,
      tipo: TipoCliente.COMUM,
      clienteCadastrador: data.clienteCadastrador || undefined,
      criadoPorId: data.criadoPorId || undefined,
      carros: data.carros ?? [],
      ordensDeServico: data.ordensDeServico ?? [],
      revisoes: data.revisoes,
    };

    this.items.push(user);
    return user as Cliente;
  }

  async FindByEmail(email: string): Promise<Cliente | null> {
    const user = this.items.find(item => item.email === email);
    return user ? user as Cliente : null;
  }

  async FindAll(): Promise<RegisterInterface[]> {
    return this.items;
  }

  async FindById(id: string): Promise<RegisterInterface | undefined> {
    const user = this.items.find(item => item.id === id);
    return user;
  }
}
