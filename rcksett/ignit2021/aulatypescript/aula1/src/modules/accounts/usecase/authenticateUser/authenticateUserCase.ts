import { QueryParams } from "../../repositories/IusersInterface";
import { Account } from "../../repositories/implements/AccontUsers";
import {inject, injectable} from "tsyringe"
import { compare } from "bcrypt";
import {sign} from "jsonwebtoken"

@injectable()
export class AuthenticateUserCase {
  constructor(
    @inject("Accounts")
    private DataAccountAuthenticate: Account) {}

  async execute({ email, password, username }: QueryParams) {
    try {
      let user;
      if (email) {
        user = await this.DataAccountAuthenticate.FindByEmail(email);
      } else if (username) {
        user = await this.DataAccountAuthenticate.FindByUsername(username);
      } else {
        throw new Error('Email ou Username deve ser fornecido');
      }
      
      if (!user) {
        throw new Error('Usuário ou senha não encontrado');
      }
      const passwordMatches = await compare(password, user.password);
      if (!passwordMatches) {
        throw  new Error('Usuário ou senha não encontrado');
      }
      const token = sign({ userId: user.id }, '647431b5ca55b04fdf3c2fce31ef1915', { expiresIn: '1d' });
      return {token, user}
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('Ocorreu um erro inesperado');
      }
    }
  }
}