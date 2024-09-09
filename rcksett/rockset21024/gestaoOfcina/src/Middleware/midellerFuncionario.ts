import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { AppError } from "@/utils/AppError";

async function authenticateFuncionario(request: FastifyRequest, reply: FastifyReply) {
    try {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new AppError("Token não fornecido.", 401);
        }

        const [, token] = authHeader.split(" ");

        if (!token) {
            throw new AppError("Token malformado.", 401);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

        request.user = { id: decoded.id };

    } catch (error) {
        if (error instanceof AppError) {
            return reply.status(error.statusCode).send({
                message: error.message,
            });
        }

        return reply.status(401).send({
            message: "Token inválido ou expirado.",
        });
    }
}

export { authenticateFuncionario };
