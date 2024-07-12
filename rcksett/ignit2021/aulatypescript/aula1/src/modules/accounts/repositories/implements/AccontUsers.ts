import {DataAccount, InterfaceAccount} from "../IusersInterface"
import {AccountUser} from "../../entites/users"
import {Repository} from "typeorm"
import {AppDataSource} from "../../../../database/data_source"

export class Account implements InterfaceAccount {
  private dataAccount: Repository<AccountUser>;

  private constructor(){
    this.dataAccount = AppDataSource.getRepository(AccountUser);
  }
  FindByUsername(username: string): Promise<DataAccount> {
    const ExistUsername = this.dataAccount.findOne({ where: { username } })
    return ExistUsername;
  }
  FindByEmail(email: string): Promise<DataAccount> {
    const ExistEmail = this.dataAccount.findOne({ where: { email } })
    return ExistEmail;
  }
 async CreateAccount({ name, driver_licence, email, password, username }: AccountUser): Promise<void> {
    const dataAccount = this.dataAccount.create({ name, driver_licence, email, password, username})
    await this.dataAccount.save(dataAccount)
  }
  ViewUsers(): Promise<AccountUser[]> {
    throw new Error("Method not implemented.");
  }

}