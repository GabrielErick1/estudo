import {InterfaceAccount, IaccountUser, QueryParams} from "../IusersInterface"
import {AccountUser} from "../../entites/users"
import {Repository} from "typeorm"
import {AppDataSource} from "../../../../database/data_source"

export class Account implements InterfaceAccount {
  private AccountUser: Repository<AccountUser>;

   constructor(){
    this.AccountUser = AppDataSource.getRepository(AccountUser);
  }
  async FindById(id: string): Promise<AccountUser> {
    const ExistUsername = await this.AccountUser.findOne({ where: { id } })
    return ExistUsername;
  }
  async ViewUsers({ email, password, username }: QueryParams): Promise<AccountUser[]> {
      const dataUsersEmail = await this.AccountUser.find({ where: { email, password } } || { where: { password, username } })
      return dataUsersEmail;
  }
  async FindByUsername(username: string): Promise<AccountUser> {
    const ExistUsername = await this.AccountUser.findOne({ where: { username } })
    return ExistUsername;
  }
  async FindByEmail(email: string): Promise<AccountUser> {
    const ExistEmail = await this.AccountUser.findOne({ where: { email } })
    return ExistEmail;
  }
 async CreateAccount({ name, driver_licence, email, password, username }: IaccountUser): Promise<void> {
    const AccountUser = this.AccountUser.create({ name, driver_licence, email, password, username})
    await this.AccountUser.save(AccountUser)
  }
  

}