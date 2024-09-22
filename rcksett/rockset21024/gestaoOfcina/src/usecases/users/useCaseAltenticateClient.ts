import {PrismaUserRepository} from "@/repositories/implements/prismaUsersRepository"
import {RegisterInterface} from "@/domain/usecases/IRegisterUser"
import {IRegister} from "@/repositories/IUserRepository"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "@/utils/AppError";

class UsecaseAltenticate {
   constructor(private repositories: PrismaUserRepository){}
   
   async execute(data: IRegister): Promise<{ user: RegisterInterface; token: string } | null>  {
     const user = await this.repositories.FindByEmail(data.email)
      if(!user){
        throw new AppError("Usuário não encontrado", 401);
      }
     const token = jwt.sign(
        { id: user.id }, // Payload
        process.env.JWT_SECRET as string, // Chave secreta
        { expiresIn: "1h" } // Validade do token
    );

     return { user, token}
   }
}