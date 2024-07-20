import { InterfaceAccount, IaccountUser } from "../../repositories/IusersInterface";
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { AppError } from "../../../../errors/appError";

@injectable()
class AccountUsercase {
  constructor(
    @inject("Accounts")
    private DataAccountService: InterfaceAccount
  ) {}

  async execute({
    email,
    name,
    username,
    password,
    driver_licence
  }: IaccountUser): Promise<void> {
    
    const existUserName = await this.DataAccountService.FindByUsername(username);
    if (existUserName) {
      throw new AppError("Username já existe", 400);
    }

    const existEmail = await this.DataAccountService.FindByEmail(email);
    if (existEmail) {
      throw new AppError("Email já existe", 400);
    }

    const hashedPassword = await hash(password, 10);
    await this.DataAccountService.CreateAccount({
      email,
      password: hashedPassword,
      name,
      username,
      driver_licence
    });
  }
}

export { AccountUsercase };
