import { FuncionarioInterface } from "@/domain/usecases/IRegisterUser";
import { ICreateFuncionarios } from "../Ifuncionarios";

export class FuncionariosRepositoryFake implements ICreateFuncionarios {
    private data: FuncionarioInterface[] = [];

    async create(data: FuncionarioInterface): Promise<FuncionarioInterface> {
        // Simula a criação de um funcionário, adicionando à lista
        this.data.push(data);
        return data;
    }

    async findByEmail(email: string): Promise<FuncionarioInterface | null> {
        // Simula a busca por email
        return this.data.find(user => user.email === email) || null;
    }

    async findByUsername(username: string): Promise<FuncionarioInterface | null> {
        // Simula a busca por username
        return this.data.find(user => user.username === username) || null;
    }

    async findAll(): Promise<FuncionarioInterface[]> {
        // Retorna todos os funcionários
        return this.data;
    }

    // Método opcional para testar casos de remoção e atualização, se necessário
    async findById(id: string): Promise<FuncionarioInterface | null> {
        // Simula a busca por ID
        return this.data.find(user => user.id === id) || null;
    }

    async update(id: string, updates: Partial<FuncionarioInterface>): Promise<FuncionarioInterface | null> {
        // Simula a atualização de um funcionário
        const index = this.data.findIndex(user => user.id === id);
        if (index === -1) return null;

        this.data[index] = { ...this.data[index], ...updates };
        return this.data[index];
    }

    async delete(id: string): Promise<void> {
        // Simula a remoção de um funcionário
        this.data = this.data.filter(user => user.id !== id);
    }
}
