import { Cliente } from "@prisma/client";
import {RegisterInterface  } from "@/domain/usecases/IRegisterUser";

export interface IRegister {
  email: string;
  password: string;
}
  
  interface InterfaceAccount {
    CreateAccount(data: RegisterInterface): Promise<Cliente>;
  //  ViewUsers({email,  password, username}: QueryParams): Promise<AccountUser[]>;
    FindByCnpj(cnpj: string): Promise<Cliente | null>;
    FindByEmail(email: string): Promise<Cliente | null>;
    FindByCpf(cpf: string): Promise<Cliente | null>;
  }
  
  export { InterfaceAccount}