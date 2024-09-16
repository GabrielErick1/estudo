import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/lib/prisma"; // Importe o Prisma Client corretamente configurado

// Middleware que verifica o tipo de funcionário
async function authenticateFuncionarioByRole(roles: string[]) {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const authHeader = request.headers.authorization;

            if (!authHeader) {
                throw new AppError("Token não fornecido.", 401);
            }

            const [, token] = authHeader.split(" ");

            if (!token) {
                throw new AppError("Token malformado.", 401);
            }

            // Verifica e decodifica o token JWT
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

            // Busca o usuário no banco de dados
            const user = await prisma.funcionario.findUnique({
                where: { id: decoded.id },
            });

            // Verifica se o usuário existe
            if (!user) {
                throw new AppError("Usuário não encontrado.", 404);
            }

            // Verifica se o cargo do usuário está incluído nos cargos permitidos
            if (!roles.includes(user.tipo)) {
                throw new AppError("Acesso negado. Você não tem permissão para acessar esta rota.", 403);
            }

            // Adiciona o usuário ao objeto de requisição para acessá-lo nas rotas
            request.user = { id: user.id, tipo: user.tipo };

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
    };
}

export { authenticateFuncionarioByRole };
