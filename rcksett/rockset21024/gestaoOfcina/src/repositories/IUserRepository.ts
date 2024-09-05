import { Cliente } from "@prisma/client";
import {RegisterInterface  } from "@/domain/usecases/IRegisterUser";


  
  interface InterfaceAccount {
    CreateAccount(data: RegisterInterface): Promise<Cliente>;
  //  ViewUsers({email,  password, username}: QueryParams): Promise<AccountUser[]>;
//    FindByUsername(username: string): Promise<AccountUser>;
    FindByEmail(email: string): Promise<Cliente | null>;
  //  FindById(email: string): Promise<AccountUser>;
  }
  
  export { InterfaceAccount}