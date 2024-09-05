import {TipoFuncionario} from "@/domain/usecases/IRegisterUser"

export interface IUser {
    email: string
    password: string
}

export interface ICreateFuncionarios {
    create(data: TipoFuncionario): Promise<TipoFuncionario>
    findByEmail(email: string): Promise<TipoFuncionario | null>
    FindByUsername(username: string): Promise<TipoFuncionario | null>;
    findAll({email, password}: IUser): Promise<TipoFuncionario[]>
}