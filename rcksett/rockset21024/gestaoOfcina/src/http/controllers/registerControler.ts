import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod'; 
import { RegisterUsecase } from '@/usecases/users/registerUseCase';
import { PrismaUserRepository } from "@/repositories/implements/prismaUsersRepository";
import { AppError } from '@/utils/AppError';
import { TipoCliente } from '@/domain/usecases/IRegisterUser';

export const Register = async (req: FastifyRequest, res: FastifyReply) => {

  const parseDate = (date: any): Date | null => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  }

  const registerBodySchema = z.object({
    nome: z.string().min(2).max(60),
    email: z.string().email().min(8).max(100),
    password: z.string().min(6).max(100),
    telefone: z.string().nullable().optional(),
    cpf: z.string().min(11).max(14).nullable().optional(),
    cnpj: z.string().min(14).max(18).nullable().optional(),
    dataDeNascimento: z.union([z.date(), z.string()]).transform(parseDate).nullable().optional(),
    clienteCadastrador: z.string().nullable().optional(),
    criadoPorId: z.string().nullable().optional(), // Permite que seja nulo ou não fornecido
    carros: z.array(z.object({
      placa: z.string(),
      modelo: z.string(),
      ano: z.number(),
      clienteId: z.string(),
    })).nullable().optional(),
    ordensDeServico: z.array(z.object({
      placaDoCarro: z.string(),
      servicosPrestados: z.string(),
      pecasUsadas: z.string(),
      valorTotal: z.number(),
      dataDeRealizacao: z.date(),
      cpf: z.string(),
      dataDeVencimento: z.date(),
      clienteId: z.string(),
      criadoPorId: z.string(),
      servicoId: z.string(),
      aprovado: z.boolean(),
      aprovadoPorId: z.string(),
      formaDePagamento: z.array(z.enum(["DINHEIRO", "CARTAO", "Pix"])), 
    })).nullable().optional(),
    revisoes: z.array(z.object({
      placaDoCarro: z.string(),
      dataDaRevisao: z.date(),
      carroId: z.string(),
      dataDaProximaRevisao: z.date().nullable().optional(), // Permite null
      mensagemPredefinida: z.string().optional(),
    })).nullable().optional(),
    tipo: z.nativeEnum(TipoCliente).optional(), // Permite que seja omitido
  });

  const {
    email,
    password,
    nome,
    cpf,
    cnpj,
    dataDeNascimento,
    tipo,
    telefone,
    carros,
    clienteCadastrador,
    criadoPorId,
    ordensDeServico,
    revisoes,
  } = registerBodySchema.parse(req.body);

  try {
    const userRepo = new PrismaUserRepository();
    const registerUseCase = new RegisterUsecase(userRepo);

    await registerUseCase.execute({
      email,
      password,
      nome,
      cpf: cpf ?? undefined,
      cnpj: cnpj ?? undefined,
      tipo: tipo ?? TipoCliente.COMUM, // Usa "COMUM" como padrão se não for fornecido
      telefone: telefone ?? undefined,
      dataDeNascimento: dataDeNascimento ?? undefined,
      clienteCadastrador: clienteCadastrador ?? undefined,
      criadoPorId: criadoPorId ?? undefined,
      carros: carros ?? [], 
      ordensDeServico: ordensDeServico ?? [],
      revisoes: revisoes ?? [],
    });

    res.status(201).send({ message: "User registered successfully" });

  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).send({ message: err.message });
    } else {
      return res.status(500).send({ message: "Internal server error" });
    }
  }
};
