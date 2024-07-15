import {InterfaceAccount, DataAccount, QueryParams} from "../IusersInterface"
import {AccountUser} from "../../entites/users"
import {Repository} from "typeorm"
import {AppDataSource} from "../../../../database/data_source"

export class Account implements InterfaceAccount {
  private dataAccount: Repository<AccountUser>;

   constructor(){
    this.dataAccount = AppDataSource.getRepository(AccountUser);
  }
  async ViewUsers({ email, password, username }: QueryParams): Promise<AccountUser[]> {
      const dataUsersEmail = await this.dataAccount.find({ where: { email, password } } || { where: { password, username } })
      return dataUsersEmail;
  }
  async FindByUsername(username: string): Promise<AccountUser> {
    const ExistUsername = await this.dataAccount.findOne({ where: { username } })
    return ExistUsername;
  }
  async FindByEmail(email: string): Promise<AccountUser> {
    const ExistEmail = await this.dataAccount.findOne({ where: { email } })
    return ExistEmail;
  }
 async CreateAccount({ name, driver_licence, email, password, username }: DataAccount): Promise<void> {
    const dataAccount = this.dataAccount.create({ name, driver_licence, email, password, username})
    await this.dataAccount.save(dataAccount)
  }
  

}