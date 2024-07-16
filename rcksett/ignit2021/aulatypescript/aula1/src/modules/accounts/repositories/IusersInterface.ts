import { AccountUser} from "../entites/users"
interface IaccountUser {
  [x: string]: any;
  name: string;
  username: string;
  password: string;
  email: string;
  driver_licence?: string;
}

interface QueryParams {
  username?: string;
  email?: string;
  password: string;
}

interface InterfaceAccount {
  CreateAccount({name, driver_licence, email, password, username}: IaccountUser): Promise<void>;
  ViewUsers({email,  password, username}: QueryParams): Promise<AccountUser[]>;
  FindByUsername(username: string): Promise<AccountUser>;
  FindByEmail(email: string): Promise<AccountUser>;
  FindById(email: string): Promise<AccountUser>;
}

export {IaccountUser, QueryParams, InterfaceAccount}