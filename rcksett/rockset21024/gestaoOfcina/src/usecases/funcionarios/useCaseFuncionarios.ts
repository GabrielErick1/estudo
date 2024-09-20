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

            const funcionarioCriado: FuncionarioInterface = {
                ...data,
                criadoPorId: criador.id, // Associar o ID do criador
            };

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

        const funcionarioCriado: FuncionarioInterface = {
            ...data,
            criadoPorId: criador.id, // Associar o criador pelo ID
        };

        const result = await this.repository.create(funcionarioCriado);
        return result;
    }

    private verificarPermissoes(tipoCriador: TipoFuncionario, tipoFuncionario: TipoFuncionario) {
        // Somente Super Admin pode criar Moderador
        if (tipoFuncionario === TipoFuncionario.MODERADOR && tipoCriador !== TipoFuncionario.SUPER_ADMIN) {
            throw new AppError("Apenas Super Admin pode criar Moderadores", 403);
        }

        // Permissões ajustadas para permitir criação por super_admin
        if (tipoCriador === TipoFuncionario.SUPER_ADMIN) {
            return; // Super admin pode criar qualquer tipo, exceto outro super_admin (verificado anteriormente)
        }

        // Admin só pode criar RH, Estoquista e Funcionário
        if (tipoCriador === TipoFuncionario.ADMIN) {
            if (![TipoFuncionario.RH, TipoFuncionario.ESTOQUE, TipoFuncionario.FUNCIONARIO].includes(tipoFuncionario)) {
                throw new AppError("Admin só pode criar RH, Estoquistas ou Funcionários", 403);
            }
        }

        if (tipoCriador === TipoFuncionario.MODERADOR && 
            (tipoFuncionario === TipoFuncionario.SUPER_ADMIN || tipoFuncionario === TipoFuncionario.MODERADOR)) {
            throw new AppError("Moderador não pode criar Super Admin ou Moderador", 403);
        }

        if (tipoCriador === TipoFuncionario.RH && 
            (tipoFuncionario !== TipoFuncionario.FUNCIONARIO && tipoFuncionario !== TipoFuncionario.ESTOQUE)) {
            throw new AppError("RH só pode criar Funcionários ou Estoquistas", 403);
        }

        if (tipoCriador === TipoFuncionario.ESTOQUE || tipoCriador === TipoFuncionario.FUNCIONARIO) {
            throw new AppError("Estoquista ou Funcionário não podem criar nenhum cargo", 403);
        }
    }
}
