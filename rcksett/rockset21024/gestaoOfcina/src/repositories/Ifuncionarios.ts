import {FuncionarioInterface} from "@/domain/usecases/IRegisterUser"

export interface IUser {
    email?: string
    senha?: string
    username?: string
}

export interface ICreateFuncionarios {
    create(data: FuncionarioInterface): Promise<FuncionarioInterface>
    findByEmail(email: string): Promise<FuncionarioInterface | null>
    findByUsername(username: string): Promise<FuncionarioInterface | null>;
    findAll(): Promise<FuncionarioInterface[]>
}