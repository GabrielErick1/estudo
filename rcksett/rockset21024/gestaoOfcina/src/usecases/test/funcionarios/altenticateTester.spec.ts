import { describe, it, beforeEach, expect } from 'vitest';
import { UseCaseAuthenticate } from '@/usecases/funcionarios/UseCaseAltenticate';
import { FuncionariosRepositoryFake } from '@/repositories/in-memory/funcionariosInMemory';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from '@/utils/AppError';
import { FuncionarioInterface, TipoFuncionario } from '@/domain/usecases/IRegisterUser';

describe('UseCaseAuthenticate', () => {
    let repository: FuncionariosRepositoryFake;
    let useCase: UseCaseAuthenticate;
    const JWT_SECRET = 'test_secret'; // Defina a variável de ambiente para testes

    beforeEach(() => {
        repository = new FuncionariosRepositoryFake();
        useCase = new UseCaseAuthenticate(repository);

        // Configurar JWT_SECRET para testes
        process.env.JWT_SECRET = JWT_SECRET;

        // Adicionar um funcionário ao repositório fake
        const senhaHash = bcrypt.hashSync('senha123', 10);
        repository.create({
            id: '1',
            email: 'test@example.com',
            username: 'testuser',
            senha: senhaHash,
            nome: 'Teste',
            cpf: '12345678901',
            dataDeNascimento: new Date('1990-01-01'),
            tipo: TipoFuncionario.ADMIN,
        });
    });

    it('deve autenticar com sucesso usando e-mail e senha corretos', async () => {
        const result = await useCase.execute({
            email: 'test@example.com',
            senha: 'senha123',
        });

        expect(result).not.toBeNull();
        expect(result?.user.email).toBe('test@example.com');
        expect(result?.token).toBeDefined();

        // Verifique o conteúdo do token JWT
        const decoded = jwt.verify(result!.token, JWT_SECRET) as jwt.JwtPayload;
        expect(decoded.id).toBe('1');
    });

    it('deve autenticar com sucesso usando nome de usuário e senha corretos', async () => {
        const result = await useCase.execute({
            username: 'testuser',
            senha: 'senha123',
        });

        expect(result).not.toBeNull();
        expect(result?.user.username).toBe('testuser');
        expect(result?.token).toBeDefined();

        // Verifique o conteúdo do token JWT
        const decoded = jwt.verify(result!.token, JWT_SECRET) as jwt.JwtPayload;
        expect(decoded.id).toBe('1');
    });

    it('deve lançar um erro se o e-mail estiver incorreto', async () => {
        await expect(useCase.execute({
            email: 'wrong@example.com',
            senha: 'senha123',
        })).rejects.toThrowError(new AppError('E-mail ou senha incorretos.', 409));
    });

    it('deve lançar um erro se a senha estiver incorreta', async () => {
        await expect(useCase.execute({
            email: 'test@example.com',
            senha: 'wrongsenha',
        })).rejects.toThrowError(new AppError('Login ou senha incorretos.', 409));
    });

    it('deve lançar um erro se nenhum e-mail ou nome de usuário for fornecido', async () => {
        await expect(useCase.execute({
            senha: 'senha123',
        })).rejects.toThrowError(new AppError('É necessário fornecer um email ou username para autenticação.', 409));
    });
});
