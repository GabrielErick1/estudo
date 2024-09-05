import { Prisma, User } from "@prisma/client";


  
  interface InterfaceAccount {
    CreateAccount(data: Prisma.UserCreateInput): Promise<User>;
  //  ViewUsers({email,  password, username}: QueryParams): Promise<AccountUser[]>;
//    FindByUsername(username: string): Promise<AccountUser>;
    FindByEmail(email: string): Promise<User | null>;
  //  FindById(email: string): Promise<AccountUser>;
  }
  
  export { InterfaceAccount}