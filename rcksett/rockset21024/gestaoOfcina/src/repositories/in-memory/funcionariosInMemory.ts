import { FuncionarioInterface } from "@/domain/usecases/IRegisterUser";
import { ICreateFuncionarios } from "../Ifuncionarios";

export class FuncionariosRepositoryFake implements ICreateFuncionarios {
    // Propriedade 'banco' adicionada para compatibilidade
    private banco: any;

    constructor() {
        this.banco = {}; // Simula a existência de um "banco de dados" qualquer
        this.data = [];
    }

    private data: FuncionarioInterface[] = [];

    async create(data: FuncionarioInterface): Promise<FuncionarioInterface> {
        this.data.push(data);
        return data;
    }

    async findByEmail(email: string): Promise<FuncionarioInterface | null> {
        return this.data.find(user => user.email === email) || null;
    }

    async findByUsername(username: string): Promise<FuncionarioInterface | null> {
        return this.data.find(user => user.username === username) || null;
    }

    async findByCpf(cpf: string): Promise<FuncionarioInterface | null> { 
        return this.data.find(user => user.cpf === cpf) || null;
    }

    async findAll(): Promise<FuncionarioInterface[]> {
        return this.data;
    }

    async findById(id: string): Promise<FuncionarioInterface | null> {
        return this.data.find(user => user.id === id) || null;
    }

    async update(id: string, updates: Partial<FuncionarioInterface>): Promise<FuncionarioInterface | null> {
        const index = this.data.findIndex(user => user.id === id);
        if (index === -1) return null;

        this.data[index] = { ...this.data[index], ...updates };
        return this.data[index];
    }

    async delete(id: string): Promise<void> {
        this.data = this.data.filter(user => user.id !== id);
    }
}
