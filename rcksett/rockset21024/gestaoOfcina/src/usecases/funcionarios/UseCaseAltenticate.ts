import { FuncionariosRepositories } from "@/repositories/implements/funcionarioRepositories";
import { IUser } from "@/repositories/Ifuncionarios";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { FuncionarioInterface } from "@/domain/usecases/IRegisterUser";
import { AppError } from "@/utils/AppError";

class UseCaseAuthenticate {
    constructor(private repository: FuncionariosRepositories) {}

    async execute(data: IUser): Promise<{ user: FuncionarioInterface; token: string } | null> {
        let user: FuncionarioInterface | null = null;

        // Verifica se foi fornecido email ou username
        if (data.email) {
            user = await this.repository.findByEmail(data.email);
            console.log(data);
            
            if (!user) {
                throw new AppError("E-mail ou senha incorretos.", 409);
            }
        } else if (data.username) {
            user = await this.repository.findByUsername(data.username);
            if (!user) {
                throw new AppError("Username ou senha incorretos.", 409);
            }
        } else {
            throw new AppError("É necessário fornecer um email ou username para autenticação.", 409);
        }
        console.log(user);
        
        // Verificar a senha utilizando bcrypt
        const issenhaValid = await bcrypt.compare(data.senha ?? "", user.senha);
        if (!issenhaValid) {
            throw new AppError("Login ou senha incorretos.", 409);
        }

        // Gerando o token JWT que contém apenas o ID do usuário
        const token = jwt.sign(
            { id: user.id }, // Payload
            process.env.JWT_SECRET as string, // Chave secreta
            { expiresIn: "1h" } // Validade do token
        );
        
        return { user, token };
    }
}

export { UseCaseAuthenticate };
