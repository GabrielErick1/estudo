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

        const { email, password, username } = parsed.data;

        try {
            const useCaseAuthenticate = FactoriesUseCaseAuthenticate()
            const usecase = await useCaseAuthenticate.execute({ email, password, username });

            return reply.status(200).send({
                message: "Autenticação bem-sucedida.",
                token: usecase?.token,
                user: usecase?.user
            });
        } catch (error) {
            if (error instanceof AppError) {
                return reply.status(error.statusCode).send({
                    message: error.message,
                });
            } else {
                return reply.status(401).send({
                    message: "E-mail, username ou senha incorretos.",
                });
            }
        }
    }
}

export { AuthController };
