import { AccountUser} from "../entites/users"
interface IaccountUser {
  name: string;
  username: string;
  password: string;
  email: string;
  driver_licence?: string;
  avatar?: string;
  id?: string;
}

interface QueryParams {
  username?: string;
  email?: string;
  password: string;
}

interface InterfaceAccount {
  CreateAccount(data: IaccountUser): Promise<void>;
  ViewUsers({email,  password, username}: QueryParams): Promise<AccountUser[]>;
  FindByUsername(username: string): Promise<AccountUser>;
  FindByEmail(email: string): Promise<AccountUser>;
  FindById(email: string): Promise<AccountUser>;
}

export {IaccountUser, QueryParams, InterfaceAccount}