import { FastifyRequest } from "fastifysssss";

declare module "fastify" {
    interface FastifyRequest {
        user?: {
            id: string;
        };
    }
}
