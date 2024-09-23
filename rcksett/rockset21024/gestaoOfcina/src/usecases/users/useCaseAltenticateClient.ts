import {PrismaUserRepository} from "@/repositories/implements/prismaUsersRepository"
import {RegisterInterface} from "@/domain/usecases/IRegisterUser"
import {IRegister} from "@/repositories/IUserRepository"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "@/utils/AppError";

class UsecaseAuthenticate {
   constructor(private repositories: PrismaUserRepository) {}
   
   async execute(data: IRegister): Promise<{ user: RegisterInterface; token: string } | null> {
    
    let user: RegisterInterface | null = null;

    if (data.email) {
        user = await this.repositories.FindByEmail(data.email) as RegisterInterface | null;
        
        if (!user) {
            throw new AppError("E-mail ou senha incorretos.", 409);
        }
    }
    
    // Verificar a senha utilizando bcrypt, garantindo que user não é null
    if (user && user.password) {
        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        
        if (!isPasswordValid) {
            throw new AppError("Login ou senha incorretos.", 409);
        }
        
        // Gerando o token JWT que contém apenas o ID do usuário
        const token = jwt.sign(
            { id: user.id }, // Payload
            process.env.JWT_SECRET as string, // Chave secreta
            { expiresIn: "1h" } // Validade do token
        );
        
        return { user, token };
    } else {
        throw new AppError("Usuário não encontrado.", 404);
    }
  }
}
