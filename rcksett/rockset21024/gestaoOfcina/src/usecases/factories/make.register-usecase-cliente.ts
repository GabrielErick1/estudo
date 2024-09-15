import { PrismaUserRepository } from "@/repositories/implements/prismaUsersRepository";
import { RegisterUsecase } from "../users/registerUseCase";

export function FactoriesregisterUseCase() {
    const userRepo = new PrismaUserRepository();
    const registerUseCase = new RegisterUsecase(userRepo);
    return registerUseCase
}