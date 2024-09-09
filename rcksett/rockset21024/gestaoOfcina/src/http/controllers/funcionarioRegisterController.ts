import { FastifyRequest, FastifyReply } from "fastify";
import {FuncionarioInterfaceSchema} from "@/domain/usecases/zodOficina"
import { AppError } from "@/utils/AppError";
import { TipoFuncionario } from "@/domain/usecases/IRegisterUser";
import { FactoriesfuncionariosUseCase } from "@/usecases/factories/make-funcionario-ussecase";



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
          const funcionariosUseCase = FactoriesfuncionariosUseCase()
       const user =   await funcionariosUseCase.execulte({
            email,
            senha,
            nome,
            cpf,
            dataDeNascimento: dataDeNascimento as Date,
            telefone,
            tipo: tipo as TipoFuncionario,
            username,
          })
          res.status(201).send(user); 
        } catch (err) {
            if (err instanceof AppError) {
              return res.status(err.statusCode).send({ message: err.message });
            } else {
              return res.status(500).send({ message: "Internal server error" });
            }
        }
    }
}