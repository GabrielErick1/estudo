import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "@/utils/AppError";
import {  userSchema} from "@/domain/usecases/altenticateZod"; // Atualize o caminho conforme necessário
import { FactoriesUseCaseAuthenticate } from "@/usecases/factories/make-funcionario-ussecase";

class AuthController {

    async handle(request: FastifyRequest, reply: FastifyReply) {
        const parsed = userSchema.safeParse(request.body);

        if (!parsed.success) {
            return reply.status(400).send({
                message: "Dados inválidos.",
                errors: parsed.error.errors,
            });
        }

        const { email, senha, username } = parsed.data;

        try {
            const useCaseAuthenticate = FactoriesUseCaseAuthenticate()
            const usecase = await useCaseAuthenticate.execute({ email, senha, username });

            return reply.status(200).send({
                message: "Autenticação bem-sucedida.",
                token: usecase?.token,
                user: usecase?.user
            });
        } catch (err) {
            if (err instanceof AppError) {
                console.log(err);
                
                return reply.status(err.statusCode).send({ message: err.message });
            } else {
                console.log(err);
                return reply.status(500).send({ message: "Internal server error" });
            }
        }
    }
}

export { AuthController };
