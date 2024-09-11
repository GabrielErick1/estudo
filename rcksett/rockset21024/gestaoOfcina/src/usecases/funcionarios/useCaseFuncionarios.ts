import { AppError } from "@/utils/AppError";
import { TipoFuncionario } from "@/domain/usecases/IRegisterUser";
import { FactoriesfuncionariosUseCase } from "@/usecases/factories/make-funcionario-ussecase";

interface RegisterFuncionarioInput {
    email: string;
    senha: string;
    nome: string;
    cpf: string;
    dataDeNascimento: Date;
    telefone: string;
    tipo: TipoFuncionario;
    username: string;
    tipoFuncionarioLogado: TipoFuncionario; 
}

export class RegisterFuncionarioUseCase {

    async execute({
        email,
        senha,
        nome,
        cpf,
        dataDeNascimento,
        telefone,
        tipo,
        username,
        tipoFuncionarioLogado
    }: RegisterFuncionarioInput) {

        if (tipo === TipoFuncionario.FUNCIONARIO || tipo === TipoFuncionario.ESTOQUE) {
            if (tipoFuncionarioLogado !== TipoFuncionario.MODERADOR && 
                tipoFuncionarioLogado !== TipoFuncionario.RH && 
                tipoFuncionarioLogado !== TipoFuncionario.ADMIN) {
                throw new AppError("Permissão negada: apenas Moderador, RH ou Admin podem criar Funcionário ou Estoquista.", 403);
            }
        }

        // 2. Apenas Moderador pode criar um Admin
        if (tipo === TipoFuncionario.ADMIN) {
            if (tipoFuncionarioLogado !== TipoFuncionario.MODERADOR) {
                throw new AppError("Permissão negada: apenas Moderador pode criar um Admin.", 403);
            }
        }

        // 3. Apenas Moderador ou Admin podem criar um RH
        if (tipo === TipoFuncionario.RH) {
            if (tipoFuncionarioLogado !== TipoFuncionario.MODERADOR && tipoFuncionarioLogado !== TipoFuncionario.ADMIN) {
                throw new AppError("Permissão negada: apenas Moderador ou Admin podem criar um RH.", 403);
            }
        }

        // Use case para criar funcionário após passar nas permissões
        const funcionariosUseCase = FactoriesfuncionariosUseCase();
        const user = await funcionariosUseCase.execulte({
            email,
            senha,
            nome,
            cpf,
            dataDeNascimento,
            telefone,
            tipo,
            username,
        });

        return user;
    }
}
