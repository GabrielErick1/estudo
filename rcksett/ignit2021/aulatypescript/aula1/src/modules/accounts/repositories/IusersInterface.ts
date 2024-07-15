interface DataAccount {
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
  CreateAccount({name, driver_licence, email, password, username}: DataAccount): Promise<void>;
  ViewUsers({email,  password, username}: QueryParams): Promise<DataAccount[]>;
  FindByUsername(username: string): Promise<DataAccount>;
  FindByEmail(email: string): Promise<DataAccount>;
}

export {DataAccount, QueryParams, InterfaceAccount}