import { FastifyRequest, FastifyReply } from "fastify";
import { FuncionarioInterfaceSchema } from "@/domain/usecases/zodOficina";
import { AppError } from "@/utils/AppError";
import { FactoriesfuncionariosUseCase } from "@/usecases/factories/make-funcionario-ussecase";
import { FuncionarioInterface, TipoFuncionario } from "@/domain/usecases/IRegisterUser";

export class FuncionarioController {
    async registerFuncionario(req: FastifyRequest, res: FastifyReply) {
        try {
            const {
                email,
                senha,
                nome,
                cpf,
                dataDeNascimento,
                telefone,
                tipo,
                username,
            } = FuncionarioInterfaceSchema.parse(req.body);
            const funcionariosUseCase = FactoriesfuncionariosUseCase();

            // Aqui você precisa obter o usuário autenticado (criador)
            const criador = req.user as FuncionarioInterface; // Supondo que o `req.user` tenha os dados do criador
            const user = await funcionariosUseCase.execute(
                {
                    email,
                    senha,
                    nome,
                    cpf,
                    dataDeNascimento: dataDeNascimento as Date,
                    telefone,
                    tipo: tipo as TipoFuncionario,
                    username,
                },
                criador
            );
            
            
            res.status(201).send(user);
        } catch (err) {
            if (err instanceof AppError) {
                console.log(err);
                
                return res.status(err.statusCode).send({ message: err.message });
            } else {
                console.log(err);
                return res.status(500).send({ message: "Internal server error" });
            }
        }
    }
}
