import { FuncionariosRepositories } from "@/repositories/implements/funcionarioRepositories";
import { FuncionarioInterface, TipoFuncionario } from "@/domain/usecases/IRegisterUser";
import { AppError } from "@/utils/AppError";



export class CadastroFuncionarioComCodigoUseCase {
    private codigoPermitido = "930899"; // O código específico que você fornece

    constructor(private repository: FuncionariosRepositories) {}

    async execute(data: FuncionarioInterface): Promise<FuncionarioInterface> {
        // Verificar se o código de registro é válido
        if (data.tipo === TipoFuncionario.SUPER_ADMIN && data.codigoRegistro !== this.codigoPermitido) {
            throw new AppError("Código de registro inválido para Super Admin invalido", 403);
        }
        
        // Verificar se o username já está cadastrado
        const existUsername = await this.repository.findByUsername(data.username);
        if (existUsername) {
            throw new AppError("Username já cadastrado", 400);
        }
        
        // Verificar se o email já está cadastrado
        const existEmail = await this.repository.findByEmail(data.email);
        if (existEmail) {
            throw new AppError("Email já cadastrado", 400);
        }

        // Definir o tipo padrão como SUPER_ADMIN se não houver código de registro
        const funcionarioCriado: FuncionarioInterface = {
            ...data,
            tipo: data.tipo, 
        };

        // Persistir o novo funcionário no banco de dados
        const result = await this.repository.create(funcionarioCriado);
        return result;
    }
}
