import { TipoFuncionario } from "@/domain/usecases/IRegisterUser";
import { ICreateFuncionarios, IUser } from "../Ifuncionarios";

export class FuncionariosRepositories implements ICreateFuncionarios  {
    create(data: TipoFuncionario): Promise<TipoFuncionario> {
        throw new Error("Method not implemented.");
    }
    findByEmail(email: string): Promise<TipoFuncionario | null> {
        throw new Error("Method not implemented.");
    }
    FindByUsername(username: string): Promise<TipoFuncionario> {
        throw new Error("Method not implemented.");
    }
    findAll({ email, password }: IUser): Promise<TipoFuncionario[]> {
        throw new Error("Method not implemented.");
    }

}