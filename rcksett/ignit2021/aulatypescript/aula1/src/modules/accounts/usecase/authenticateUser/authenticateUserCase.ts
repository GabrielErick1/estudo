import { QueryParams, InterfaceAccount } from "../../repositories/IusersInterface";
import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../errors/appError";

interface IResponse {
  user: {
    email: string;
    name: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserCase {
  constructor(
    @inject("Accounts")
    private dataAccountAuthenticate: InterfaceAccount
  ) {}

  async execute({ email, password, username }: QueryParams): Promise<IResponse> {
    try {
      const user = email
        ? await this.dataAccountAuthenticate.FindByEmail(email)
        : username
        ? await this.dataAccountAuthenticate.FindByUsername(username)
        : null;

      if (!user) {
        throw new AppError('Usuário ou senha não encontrado', 400);
      }

      const passwordMatches = await compare(password, user.password);
      if (!passwordMatches) {
        throw new AppError('Usuário ou senha não encontrado', 400);
      }

      const token = sign(
        { userId: user.id },
        '647431b5ca55b04fdf3c2fce31ef1915',
        { expiresIn: '1d' }
      );

      return {
        token,
        user: {
          email: user.email,
          name: user.name,
        },
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new AppError(error.message);
      } else {
        throw new AppError('Ocorreu um erro inesperado', 500);
      }
    }
  }
}
