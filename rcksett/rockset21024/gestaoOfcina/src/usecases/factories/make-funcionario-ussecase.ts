import { FuncionariosRepositories } from "@/repositories/implements/funcionarioRepositories";
import { FuncionariosUseCase } from "../funcionarios/useCaseFuncionarios";
import {UseCaseAuthenticate  } from "@/usecases/funcionarios/UseCaseAltenticate";


export function FactoriesfuncionariosUseCase() {
    const funcionarioRepository = new FuncionariosRepositories();
    const funcionariosUseCase = new FuncionariosUseCase(funcionarioRepository);
    return funcionariosUseCase;
}

export function FactoriesUseCaseAuthenticate() {
    const funcionarioRepository = new FuncionariosRepositories();
    const altenticateFuncionarios = new UseCaseAuthenticate(funcionarioRepository);
    return altenticateFuncionarios;
}