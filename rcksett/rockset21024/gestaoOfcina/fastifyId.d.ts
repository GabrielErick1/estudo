import { TipoFuncionario } from "@/domain/usecases/IRegisterUser";
import { FastifyRequest } from "fastifysssss";

declare module "fastify" {
    interface FastifyRequest {
        user?: {
            id: string;
            tipo: string;
        };
    }
}
