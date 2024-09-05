import {FuncionarioInterface} from "@/domain/usecases/IRegisterUser"

export interface IUser {
    email: string
    password: string
}

export interface ICreateFuncionarios {
    create(data: FuncionarioInterface): Promise<FuncionarioInterface>
    findByEmail(email: string): Promise<FuncionarioInterface | null>
    FindByUsername(username: string): Promise<FuncionarioInterface | null>;
    findAll(): Promise<FuncionarioInterface[]>
}