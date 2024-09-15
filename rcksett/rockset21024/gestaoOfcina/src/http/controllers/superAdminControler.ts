import { FastifyReply, FastifyRequest } from 'fastify';
import { FactoriesUseCaseSuperAdmin } from '@/usecases/factories/make-funcionario-ussecase';
import { FuncionarioInterfaceSchema } from '@/domain/usecases/zodOficina';
import { AppError } from '@/utils/AppError';
import { TipoFuncionario } from '@/domain/usecases/IRegisterUser';


export class CadastroFuncionarioComCodigoController {

    async registerSuperadmin(req: FastifyRequest, res: FastifyReply) {
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
                codigoRegistro
            } = FuncionarioInterfaceSchema.parse(req.body);

            const superAdminUseCase = FactoriesUseCaseSuperAdmin();
            const funcionario = await superAdminUseCase.execute({  
                email,
                senha,
                nome,
                cpf,
                dataDeNascimento,
                telefone,
                tipo: tipo as TipoFuncionario,
                username,
                codigoRegistro})

                res.code(201).send(funcionario);
        } catch (error) {
            if (error instanceof AppError) {
                console.log(error);
                
                return res.status(error.statusCode).send({ message: error.message });
            } else {
                console.log(error);
                return res.status(500).send({ message: "Internal server error" });
            }
        }
    }
}
