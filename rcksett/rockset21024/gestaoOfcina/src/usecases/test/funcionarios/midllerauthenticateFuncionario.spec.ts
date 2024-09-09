import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FastifyReply, FastifyRequest } from "fastify";
import jwt from 'jsonwebtoken';
import { authenticateFuncionario } from '@/Middleware/midellerFuncionario';
import { AppError } from '@/utils/AppError';

describe('authenticateFuncionario Middleware', () => {
    let mockRequest: Partial<FastifyRequest>;
    let mockReply: Partial<FastifyReply>;
    const JWT_SECRET = 'test_secret'; // Defina a variável de ambiente para testes

    beforeEach(() => {
        mockReply = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn(),
        };
        process.env.JWT_SECRET = JWT_SECRET;
    });

    it('deve passar a autenticação com um token válido', async () => {
        const token = jwt.sign({ id: 'user-id-123' }, JWT_SECRET);
        mockRequest = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };

        await authenticateFuncionario(mockRequest as FastifyRequest, mockReply as FastifyReply);

        expect(mockRequest.user).toEqual({ id: 'user-id-123' });
    });

    it('deve retornar erro 401 se o token não for fornecido', async () => {
        mockRequest = {
            headers: {},
        };

        await authenticateFuncionario(mockRequest as FastifyRequest, mockReply as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(401);
        expect(mockReply.send).toHaveBeenCalledWith({ message: 'Token não fornecido.' });
    });

    it('deve retornar erro 401 se o token for malformado', async () => {
        mockRequest = {
            headers: {
                authorization: 'Bearer ',
            },
        };

        await authenticateFuncionario(mockRequest as FastifyRequest, mockReply as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(401);
        expect(mockReply.send).toHaveBeenCalledWith({ message: 'Token malformado.' });
    });

    it('deve retornar erro 401 se o token for inválido', async () => {
        mockRequest = {
            headers: {
                authorization: 'Bearer invalid-token',
            },
        };

        await authenticateFuncionario(mockRequest as FastifyRequest, mockReply as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(401);
        expect(mockReply.send).toHaveBeenCalledWith({ message: 'Token inválido ou expirado.' });
    });

    it('deve retornar erro 401 se o JWT_SECRET estiver ausente ou incorreto', async () => {
        process.env.JWT_SECRET = 'wrong_secret';
        const token = jwt.sign({ id: 'user-id-123' }, JWT_SECRET);
        mockRequest = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };

        await authenticateFuncionario(mockRequest as FastifyRequest, mockReply as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(401);
        expect(mockReply.send).toHaveBeenCalledWith({ message: 'Token inválido ou expirado.' });
    });

    it('deve retornar um erro AppError customizado se ocorrer um erro de validação', async () => {
        process.env.JWT_SECRET = JWT_SECRET;
        const token = jwt.sign({ id: 'user-id-123' }, JWT_SECRET);
        mockRequest = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };

        const mockError = new AppError('Token customizado inválido', 401);
        jwt.verify = vi.fn(() => { throw mockError });

        await authenticateFuncionario(mockRequest as FastifyRequest, mockReply as FastifyReply);

        expect(mockReply.status).toHaveBeenCalledWith(401);
        expect(mockReply.send).toHaveBeenCalledWith({ message: 'Token customizado inválido' });
    });
});
