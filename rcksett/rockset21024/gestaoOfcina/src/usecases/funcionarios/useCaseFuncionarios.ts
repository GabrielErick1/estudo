import { FuncionariosRepositories } from "@/repositories/implements/funcionarioRepositories";
import {FuncionarioInterface} from "@/domain/usecases/IRegisterUser"



export class FuncionariosUseCase {
    constructor(private repository: FuncionariosRepositories){}


async execulte(data: FuncionarioInterface): Promise<FuncionarioInterface> {
    const existEmail = await this.repository.findByEmail(data.email)
    if (existEmail) {
        throw new Error("Email já cadastrado")
    }
    const existUsername = await this.repository.findByUsername(data.username)
    if (existUsername) {
        throw new Error("Username já cadastrado")
    }
    const result = await this.repository.create(data)
    return result;
  }
}