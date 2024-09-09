import { FuncionariosUseCase } from "@/usecases/funcionarios/useCaseFuncionarios";
import { FuncionariosRepositoryFake } from "@/repositories/in-memory/funcionariosInMemory";
import { FuncionarioInterface, TipoFuncionario } from "@/domain/usecases/IRegisterUser";
import { beforeEach, describe, it } from "node:test";
import { expect } from "vitest";

describe('FuncionariosUseCase', () => {
    let repository: FuncionariosRepositoryFake;
    let useCase: FuncionariosUseCase;

    beforeEach(() => {
        repository = new FuncionariosRepositoryFake();
        useCase = new FuncionariosUseCase(repository);
    });

    it('deve criar um funcionario', async () => {
        const funcionario: FuncionarioInterface = {
            email: "test@example.com",
            senha: "password123",
            nome: "Test User",
            cpf: "12345678900",
            dataDeNascimento: new Date("2000-01-01"),
            telefone: "123456789",
            tipo: TipoFuncionario.ADMIN,
            username: "testuser"
        };

        const result = await useCase.execulte(funcionario);

        expect(result).toEqual(funcionario);
        expect(await repository.findByEmail(funcionario.email)).toEqual(funcionario);
        expect(await repository.findByUsername(funcionario.username)).toEqual(funcionario);
    });

    it('should throw error if email already exists', async () => {
        const funcionario: FuncionarioInterface = {
            email: "test@example.com",
            senha: "password123",
            nome: "Test User",
            cpf: "12345678900",
            dataDeNascimento: new Date("2000-01-01"),
            telefone: "123456789",
            tipo: TipoFuncionario.ADMIN,
            username: "testuser"
        };

        await useCase.execulte(funcionario);

        const newFuncionario: FuncionarioInterface = {
            email: "test@example.com",
            senha: "newpassword123",
            nome: "Another User",
            cpf: "09876543211",
            dataDeNascimento: new Date("1990-01-01"),
            telefone: "987654321",
            tipo: TipoFuncionario.FUNCIONARIO,
            username: "anotheruser"
        };

        await expect(useCase.execulte(newFuncionario)).rejects.toThrowError("Email já cadastrado");
    });

    it('should throw error if username already exists', async () => {
        const funcionario: FuncionarioInterface = {
            email: "test@example.com",
            senha: "password123",
            nome: "Test User",
            cpf: "12345678900",
            dataDeNascimento: new Date("2000-01-01"),
            telefone: "123456789",
            tipo: TipoFuncionario.ADMIN,
            username: "testuser"
        };

        await useCase.execulte(funcionario);

        const newFuncionario: FuncionarioInterface = {
            email: "newtest@example.com",
            senha: "newpassword123",
            nome: "Another User",
            cpf: "09876543211",
            dataDeNascimento: new Date("1990-01-01"),
            telefone: "987654321",
            tipo: TipoFuncionario.FUNCIONARIO,
            username: "testuser"
        };

        await expect(useCase.execulte(newFuncionario)).rejects.toThrowError("Username já cadastrado");
    });
});
