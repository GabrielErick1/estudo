// tests/midllerauthenticateFuncionario.spec.ts
import { describe, it, expect, beforeEach, vi } from "vitest";
import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { authenticateFuncionarioByRole } from "@/Middleware/midellerFuncionario";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/lib/prisma"; // Mock do Prisma
import { TipoFuncionario } from "@prisma/client"; // Import do TipoFuncionario

describe("authenticateFuncionarioByRole Middleware", () => {
    let mockRequest: Partial<FastifyRequest>;
    let mockReply: Partial<FastifyReply>;
    const JWT_SECRET = "test_secret";

    beforeEach(() => {
        mockReply = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn(),
        };
        process.env.JWT_SECRET = JWT_SECRET;

        // Mock do Prisma para retornar um usuário válido
        vi.spyOn(prisma.funcionario, "findUnique").mockResolvedValue({
            id: "user-id-123",
            nome: "Test User",  // Adicionei os campos que faltavam
            username: "testuser",
            cpf: "12345678900",
            dataDeNascimento: new Date("1990-01-01"),
            email: "test@example.com",
            senha: "hashedpassword",
            telefone: "123456789",
            tipo: TipoFuncionario.admin, // ou outro tipo permitido
            criadoPorId: null,
        });
    });

    it("deve passar a autenticação com um token válido e usuário com cargo permitido", async () => {
        const token = jwt.sign({ id: "user-id-123" }, JWT_SECRET);
        mockRequest = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };

        await authenticateFuncionarioByRole(mockRequest as FastifyRequest, mockReply as FastifyReply, ["admin"]);
        expect(mockRequest.user).toEqual({ id: "user-id-123", tipo: "admin" });
    });

    it("deve retornar erro 401 se o token não for fornecido", async () => {
        mockRequest = { headers: {} };

        await authenticateFuncionarioByRole(mockRequest as FastifyRequest, mockReply as FastifyReply, ["admin"]);

        expect(mockReply.status).toHaveBeenCalledWith(401);
        expect(mockReply.send).toHaveBeenCalledWith({ message: "Token não fornecido." });
    });

    it("deve retornar erro 401 se o token for malformado", async () => {
        mockRequest = {
            headers: {
                authorization: "Bearer ",
            },
        };

        await authenticateFuncionarioByRole(mockRequest as FastifyRequest, mockReply as FastifyReply, ["admin"]);

        expect(mockReply.status).toHaveBeenCalledWith(401);
        expect(mockReply.send).toHaveBeenCalledWith({ message: "Token malformado." });
    });

    it("deve retornar erro 404 se o usuário não for encontrado", async () => {
        vi.spyOn(prisma.funcionario, "findUnique").mockResolvedValue(null);

        const token = jwt.sign({ id: "user-id-123" }, JWT_SECRET);
        mockRequest = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };

        await authenticateFuncionarioByRole(mockRequest as FastifyRequest, mockReply as FastifyReply, ["admin"]);

        expect(mockReply.status).toHaveBeenCalledWith(404);
        expect(mockReply.send).toHaveBeenCalledWith({ message: "Usuário não encontrado." });
    });

    it("deve retornar erro 403 se o cargo do usuário não for permitido", async () => {
        const token = jwt.sign({ id: "user-id-123" }, JWT_SECRET);
        mockRequest = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };

        await authenticateFuncionarioByRole(mockRequest as FastifyRequest, mockReply as FastifyReply, ["rh"]); // Exemplo: cargo permitido diferente do user

        expect(mockReply.status).toHaveBeenCalledWith(403);
        expect(mockReply.send).toHaveBeenCalledWith({
            message: "Acesso negado. Você não tem permissão para acessar esta rota.",
        });
    });

    it("deve retornar erro 401 se o token for inválido ou expirado", async () => {
        mockRequest = {
            headers: {
                authorization: "Bearer invalid-token",
            },
        };

        await authenticateFuncionarioByRole(mockRequest as FastifyRequest, mockReply as FastifyReply, ["admin"]);

        expect(mockReply.status).toHaveBeenCalledWith(401);
        expect(mockReply.send).toHaveBeenCalledWith({
            message: "Token inválido ou expirado.",
        });
    });
});
