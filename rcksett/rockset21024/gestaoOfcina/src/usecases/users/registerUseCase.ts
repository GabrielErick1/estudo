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
      throw new AppError("Esse Email ja existe em nosso sistema", 409);
    }
  }

  private async validateCpf(cpf: string): Promise<void> {
    const existCpf = await this.userRepository.FindByEmail(cpf);
    if (existCpf) {
      throw new AppError("Esse CPF ja existe em nosso sistema", 409);
    }
  }

  private async validateCnpj(cnpj: string): Promise<void> {
    const existCnpj = await this.userRepository.FindByEmail(cnpj);
    if (existCnpj) {
      throw new AppError("Esse CNPJ ja existe em nosso sistema", 409);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return await hash(password, 4); 
  }



  private determineTipoCliente(): TipoCliente {
    // Define o tipo como sempre "COMUM"
    return TipoCliente.COMUM;
  }

  async execute(data: RegisterInterface): Promise<RegisterUseCaseResponse> {
    await this.validateEmail(data.email);
    if(data.cpf){
       await this.validateCpf(data.cpf);
    }
   if(data.cnpj){
    await this.validateCnpj(data.cnpj);
   }
    
    const hashedPassword = await this.hashPassword(data.password);

    const tipoCliente = this.determineTipoCliente();

    const createdUser = await this.userRepository.CreateAccount({
      ...data,
      password: hashedPassword,
      tipo: tipoCliente,
    });

    return { user: createdUser };
  }
}
