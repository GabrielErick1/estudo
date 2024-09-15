<<<<<<< HEAD
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
=======
import { FuncionariosRepositories } from "@/repositories/implements/funcionarioRepositories";
import { FuncionarioInterface, TipoFuncionario } from "@/domain/usecases/IRegisterUser";
import { AppError } from "@/utils/AppError";

export class FuncionariosUseCase {
    constructor(private repository: FuncionariosRepositories) {}

    async execute(data: FuncionarioInterface, criador: FuncionarioInterface): Promise<FuncionarioInterface> {
        // Verificar se criador e data são válidos
        if (!criador || !data) {
            throw new AppError("Dados inválidos", 400);
        }

        if (!criador.tipo || !data.tipo) {
            throw new AppError("Tipo do criador ou do funcionário não definido", 400);
        }

        // Se o criador for um super_admin e o tipo do novo funcionário também for super_admin
        // não permita que o super_admin crie outro super_admin
        if (criador.tipo === TipoFuncionario.SUPER_ADMIN) {
            if (data.tipo === TipoFuncionario.SUPER_ADMIN) {
                throw new AppError("Super Admin não pode criar outro Super Admin", 403);
            }

            // Se o tipo do novo funcionário não for super_admin, ele pode ser criado
            const funcionarioCriado: FuncionarioInterface = {
                ...data,
                criadoPorId: criador.id, // Associar o ID do criador
            };

            // Persistir o novo funcionário no banco de dados
            const result = await this.repository.create(funcionarioCriado);
            return result;
        }

        // Verificar permissões para criação de outros tipos de funcionários
        this.verificarPermissoes(criador.tipo, data.tipo);

        // Verificar se o email já está registrado
        const existEmail = await this.repository.findByEmail(data.email);
        if (existEmail) {
            throw new AppError("Email já cadastrado", 400);
        }

        // Verificar se o username já está registrado
        const existUsername = await this.repository.findByUsername(data.username);
        if (existUsername) {
            throw new AppError("Username já cadastrado", 400);
        }

        // Adicionar o ID do criador ao funcionário sendo criado
        const funcionarioCriado: FuncionarioInterface = {
            ...data,
            criadoPorId: criador.id, // Associar o criador pelo ID
        };

        // Persistir o novo funcionário no banco de dados
        const result = await this.repository.create(funcionarioCriado);
        return result;
    }

    private verificarPermissoes(tipoCriador: TipoFuncionario, tipoFuncionario: TipoFuncionario) {
        // Permissões ajustadas para permitir criação por super_admin
        if (tipoCriador === TipoFuncionario.SUPER_ADMIN) {
            return; // Super admin pode criar qualquer tipo
        }

        if (tipoCriador === TipoFuncionario.MODERADOR && 
            (tipoFuncionario === TipoFuncionario.SUPER_ADMIN || tipoFuncionario === TipoFuncionario.MODERADOR)) {
            throw new AppError("Moderador não pode criar Super Admin ou Moderador", 403);
        }

        if (tipoCriador === TipoFuncionario.ADMIN && 
            (tipoFuncionario === TipoFuncionario.SUPER_ADMIN || tipoFuncionario === TipoFuncionario.MODERADOR)) {
            throw new AppError("Admin não pode criar Super Admin ou Moderador", 403);
        }

        if (tipoCriador === TipoFuncionario.RH && 
            (tipoFuncionario !== TipoFuncionario.FUNCIONARIO && tipoFuncionario !== TipoFuncionario.ESTOQUE)) {
            throw new AppError("RH só pode criar Funcionários ou Estoquistas", 403);
        }

        if (tipoCriador === TipoFuncionario.ESTOQUE || tipoCriador === TipoFuncionario.FUNCIONARIO) {
            throw new AppError("Estoquista ou Funcionário não podem criar nenhum cargo", 403);
        }
    }
>>>>>>> 910ef6b217713263171694d85c489318efe115eb
}