import { QueryParams } from "../repositories/IusersInterface";
import { Account } from "../repositories/implements/AccontUsers";

import { compare } from "bcrypt";
import {sign} from "jsonwebtoken"


export class AuthenticateUserCase {
  constructor(private DataAccountAuthenticate: Account) {}

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
      const token = sign({ userId: user.id }, 'secret_key', { expiresIn: '1d' });
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