import { FuncionariosUseCase } from "@/usecases/funcionarios/useCaseFuncionarios";
import { FuncionariosRepositoryFake } from "@/repositories/in-memory/funcionariosInMemory";
import { FuncionarioInterface, TipoFuncionario } from "@/domain/usecases/IRegisterUser";
import { beforeEach, describe, it, expect } from "vitest";

describe('FuncionariosUseCase', () => {
    let repository: FuncionariosRepositoryFake;
    let useCase: FuncionariosUseCase;

    beforeEach(() => {
        repository = new FuncionariosRepositoryFake();
        useCase = new FuncionariosUseCase(repository);
    });

    it('deve criar um funcionario', async () => {
        const criador: FuncionarioInterface = {
            email: "creator@example.com",
            senha: "creatorpassword",
            nome: "Creator",
            cpf: "12345678901",
            dataDeNascimento: new Date("1980-01-01"),
            telefone: "111111111",
            tipo: TipoFuncionario.SUPER_ADMIN,
            username: "creator",
            criadoPorId: "", // Isso pode ser ajustado conforme necessário
        };

        const funcionario: FuncionarioInterface = {
            email: "test@example.com",
            senha: "password123",
            nome: "Test User",
            cpf: "12345678900",
            dataDeNascimento: new Date("2000-01-01"),
            telefone: "123456789",
            tipo: TipoFuncionario.ADMIN,
            username: "testuser",
            criadoPorId: criador.id,
            criadoPor: criador,
        };

        await useCase.execute(funcionario, criador);

        expect(await repository.findByEmail(funcionario.email)).toEqual(funcionario);
        expect(await repository.findByUsername(funcionario.username)).toEqual(funcionario);
    });

    it('deve lançar erro se o email já estiver cadastrado', async () => {
        const criador: FuncionarioInterface = {
            email: "creator@example.com",
            senha: "creatorpassword",
            nome: "Creator",
            cpf: "12345678901",
            dataDeNascimento: new Date("1980-01-01"),
            telefone: "111111111",
            tipo: TipoFuncionario.SUPER_ADMIN,
            username: "creator",
            criadoPorId: "", // Isso pode ser ajustado conforme necessário
        };

        const funcionario: FuncionarioInterface = {
            email: "test@example.com",
            senha: "password123",
            nome: "Test User",
            cpf: "12345678900",
            dataDeNascimento: new Date("2000-01-01"),
            telefone: "123456789",
            tipo: TipoFuncionario.ADMIN,
            username: "testuser",
            criadoPorId: criador.id,
            criadoPor: criador,
        };

        await useCase.execute(funcionario, criador);

        const newFuncionario: FuncionarioInterface = {
            email: "test@example.com",
            senha: "newpassword123",
            nome: "Another User",
            cpf: "09876543211",
            dataDeNascimento: new Date("1990-01-01"),
            telefone: "987654321",
            tipo: TipoFuncionario.FUNCIONARIO,
            username: "anotheruser",
            criadoPorId: criador.id,
            criadoPor: criador,
        };

        await expect(useCase.execute(newFuncionario, criador)).rejects.toThrowError("Email já cadastrado");
    });

    it('deve lançar erro se o username já estiver cadastrado', async () => {
        const criador: FuncionarioInterface = {
            email: "creator@example.com",
            senha: "creatorpassword",
            nome: "Creator",
            cpf: "12345678901",
            dataDeNascimento: new Date("1980-01-01"),
            telefone: "111111111",
            tipo: TipoFuncionario.SUPER_ADMIN,
            username: "creator",
            criadoPorId: "", // Isso pode ser ajustado conforme necessário
        };

        const funcionario: FuncionarioInterface = {
            email: "test@example.com",
            senha: "password123",
            nome: "Test User",
            cpf: "12345678900",
            dataDeNascimento: new Date("2000-01-01"),
            telefone: "123456789",
            tipo: TipoFuncionario.ADMIN,
            username: "testuser",
            criadoPorId: criador.id,
            criadoPor: criador,
        };

        await useCase.execute(funcionario, criador);

        const newFuncionario: FuncionarioInterface = {
            email: "newtest@example.com",
            senha: "newpassword123",
            nome: "Another User",
            cpf: "09876543211",
            dataDeNascimento: new Date("1990-01-01"),
            telefone: "987654321",
            tipo: TipoFuncionario.FUNCIONARIO,
            username: "testuser",
            criadoPorId: criador.id,
            criadoPor: criador,
        };

        await expect(useCase.execute(newFuncionario, criador)).rejects.toThrowError("Username já cadastrado");
    });
    it('deve permitir um SUPER_ADMIN criar um MODERADOR', async () => {
        // Criar um SUPER_ADMIN
        const criador: FuncionarioInterface = {
            id: "super-admin-id",
            email: "superadmin@example.com",
            senha: "superadminpassword",
            nome: "Super Admin",
            cpf: "12345678901",
            dataDeNascimento: new Date("1970-01-01"),
            telefone: "111111111",
            tipo: TipoFuncionario.SUPER_ADMIN,
            username: "superadmin",
            criadoPorId: "", // ID não utilizado diretamente
        };

        // Adiciona o SUPER_ADMIN ao repositório
        await repository.create(criador);

        // Tentar criar um MODERADOR com o SUPER_ADMIN
        const moderador: FuncionarioInterface = {
            id: "moderator-id",
            email: "moderator@example.com",
            senha: "moderatorpassword",
            nome: "Moderator",
            cpf: "98765432100",
            dataDeNascimento: new Date("1990-01-01"),
            telefone: "222222222",
            tipo: TipoFuncionario.MODERADOR,
            username: "moderator",
            criadoPorId: criador.id, // Associando o criador pelo ID
            criadoPor: criador,
        };

        const result = await useCase.execute(moderador, criador);

        expect(result).toEqual(moderador);
        expect(await repository.findByEmail(moderador.email)).toEqual(moderador);
        expect(await repository.findByUsername(moderador.username)).toEqual(moderador);
    });

    it('deve lançar erro se um ADMIN tentar criar um MODERADOR', async () => {
        // Criar um ADMIN
        const criador: FuncionarioInterface = {
            id: "admin-id",
            email: "admin@example.com",
            senha: "adminpassword",
            nome: "Admin",
            cpf: "11122334455",
            dataDeNascimento: new Date("1985-01-01"),
            telefone: "333333333",
            tipo: TipoFuncionario.ADMIN,
            username: "admin",
            criadoPorId: "", // ID não utilizado diretamente
        };

        // Adiciona o ADMIN ao repositório
        await repository.create(criador);

        // Tentar criar um MODERADOR com o ADMIN
        const moderador: FuncionarioInterface = {
            id: "moderator-id",
            email: "moderator@example.com",
            senha: "moderatorpassword",
            nome: "Moderator",
            cpf: "98765432100",
            dataDeNascimento: new Date("1990-01-01"),
            telefone: "222222222",
            tipo: TipoFuncionario.MODERADOR,
            username: "moderator",
            criadoPorId: criador.id, // Associando o criador pelo ID
            criadoPor: criador,
        };

        await expect(useCase.execute(moderador, criador)).rejects.toThrowError("Admin não pode criar Super Admin ou Moderador");
    });
});
