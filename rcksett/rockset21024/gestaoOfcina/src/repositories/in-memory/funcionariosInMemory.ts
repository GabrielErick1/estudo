// __mocks__/FuncionarioRepositoryFake.ts
import { FuncionarioInterface } from "@/domain/usecases/IRegisterUser";
import { ICreateFuncionarios } from "../Ifuncionarios";

export class FuncionariosRepositoryFake implements ICreateFuncionarios {
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

    async findAll(): Promise<FuncionarioInterface[]> {
        return this.data;
    }
}
