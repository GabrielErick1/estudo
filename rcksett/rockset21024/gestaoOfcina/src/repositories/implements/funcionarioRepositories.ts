import { FuncionarioInterface } from "@/domain/usecases/IRegisterUser";
import { ICreateFuncionarios, IUser } from "../Ifuncionarios";
import { prisma } from "@/lib/prisma";

export class FuncionariosRepositories implements ICreateFuncionarios {
       async create(data: FuncionarioInterface): Promise<FuncionarioInterface> {
        const user = await prisma.funcionario.create({
            data: {
                nome: data.nome,
                email: data.email,
                cpf: data.cpf,
                tipo: data.tipo,
                dataDeNascimento: data.dataDeNascimento,
                senha: data.senha,
                username: data.username,
            },
        });
        return user as FuncionarioInterface;
    }

    async findByEmail(email: string): Promise<FuncionarioInterface | null> {
        const user = await prisma.funcionario.findUnique({
            where: { email },
        });
          return user as FuncionarioInterface;
    }

    async findByUsername(username: string): Promise<FuncionarioInterface | null> {
        const user = await prisma.funcionario.findUnique({
            where: { username },
        });
        return user as FuncionarioInterface;
    }

    async findAll(): Promise<FuncionarioInterface[]> {
        const users = await prisma.funcionario.findMany();
        return users as FuncionarioInterface[];
    }
}
