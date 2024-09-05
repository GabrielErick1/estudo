import { hash } from 'bcrypt';
import { InterfaceAccount } from "@/repositories/IUserRepository";
import { AppError } from '@/utils/AppError';
import { RegisterInterface, TipoCliente } from "@/domain/usecases/IRegisterUser";
import { Cliente } from '@prisma/client';

interface RegisterUseCaseResponse {
  user: Cliente;
}

export class RegisterUsecase {
  constructor(private readonly userRepository: InterfaceAccount) {}

  private async validateEmail(email: string): Promise<void> {
    const existEmail = await this.userRepository.FindByEmail(email);
    if (existEmail) {
      throw new AppError("Email already exists", 409);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return await hash(password, 4); 
  }

  private prepareOrdensDeServico(
    ordensDeServico?: RegisterInterface["ordensDeServico"],
    criadoPorId?: string
  ): RegisterInterface["ordensDeServico"] {

    // Se `ordensDeServico` estiver definido, mas o `criadoPorId` não for de um funcionário ou administrador, lança um erro //

    if (ordensDeServico && !(criadoPorId && criadoPorId.startsWith('funcionario') || criadoPorId && criadoPorId.startsWith('admin'))) {
      throw new AppError("As ordens de serviço só podem ser criadas por um funcionário ou administrador.", 400);
    }

    // Se `ordensDeServico` não estiver definido, retorna um array vazio
    if (!ordensDeServico) return [];

    // Atribui o `criadoPorId` (ID do funcionário ou administrador) a cada ordem de serviço
    return ordensDeServico.map((ordem) => ({
      ...ordem,
      criadoPorId: criadoPorId || '',
    }));
  }

  private prepareCarros(carros?: RegisterInterface["carros"], clienteId?: string): RegisterInterface["carros"] {
    if (!carros) return [];

    if (!clienteId) {
      throw new AppError("Cliente ID é necessário para cadastrar carros.", 400);
    }

    return carros.map((carro) => ({
      ...carro,
      clienteId: clienteId, 
    }));
  }

  private prepareRevisoes(
    revisoes?: RegisterInterface["revisoes"],
    clienteId?: string
  ): RegisterInterface["revisoes"] {
    if (!revisoes) return [];

    if (!clienteId) {
      throw new AppError("Cliente ID é necessário para cadastrar revisões.", 400);
    }

    return revisoes.map((revisao) => ({
      ...revisao,
      clienteId: clienteId, 
    }));
  }

  private determineTipoCliente(): TipoCliente {
    // Define o tipo como sempre "COMUM"
    return TipoCliente.COMUM;
  }

  async execute(data: RegisterInterface): Promise<RegisterUseCaseResponse> {
    await this.validateEmail(data.email);

    const hashedPassword = await this.hashPassword(data.password);

    const tipoCliente = this.determineTipoCliente();

    const ordensDeServicoPreparadas = this.prepareOrdensDeServico(data.ordensDeServico, data.criadoPorId);
    const carrosPreparados = this.prepareCarros(data.carros, data.id);
    const revisoesPreparadas = this.prepareRevisoes(data.revisoes, data.id);

    const createdUser = await this.userRepository.CreateAccount({
      ...data,
      password: hashedPassword,
      tipo: tipoCliente,
      carros: carrosPreparados,
      revisoes: revisoesPreparadas,
      ordensDeServico: ordensDeServicoPreparadas,
    });

    return { user: createdUser };
  }
}
