import { expect, describe, it, beforeEach } from "vitest";
import { RepositoryInMemory } from "@/repositories/in-memory/RepositoryInMemory";
import { RegisterUsecase } from "@/usecases/users/registerUseCase";
import { compare } from "bcrypt";
import { AppError } from "@/utils/AppError";
import { TipoCliente } from "@/domain/usecases/IRegisterUser";

// Configuração dos testes
const makeSut = () => {
  const userRepository = new RepositoryInMemory();
  const sut = new RegisterUsecase(userRepository);
  return { sut, userRepository };
};

describe("Register Usecase", () => {
  let sut: RegisterUsecase;
  let userRepository: RepositoryInMemory;

  beforeEach(() => {
    const setup = makeSut();
    sut = setup.sut;
    userRepository = setup.userRepository;
  });

  it("deve hashear a senha antes de salvar o usuário", async () => {
    const userData = {
      email: "teste@exemplo.com",
      nome: "Teste Usuário",
      password: "senha123",
      telefone: "11999999999",
      cpf: "08390763125",
      dataDeNascimento: new Date("2014-01-01"),
      dataDeUltimaRevisao: undefined,
      tipo: TipoCliente.COMUM,  // Inclua o tipo
    };

    const { user } = await sut.execute(userData);

    expect(user.password).not.toBe(userData.password);
    const isPasswordValid = await compare(userData.password, user.password);
    expect(isPasswordValid).toBe(true);
  });

  it("deve lançar erro se o email já estiver em uso", async () => {
    const userData = {
      email: "teste@exemplo.com",
      nome: "Teste Usuário",
      password: "senha123",
      telefone: "11999999999",
      cpf: "08390763125",
      dataDeNascimento: new Date("2014-01-01"),
      dataDeUltimaRevisao: undefined,
      tipo: TipoCliente.COMUM,  // Inclua o tipo
    };

    await sut.execute(userData);

    await expect(sut.execute({
      email: "teste@exemplo.com",
      nome: "Outro Usuário",
      password: "outraSenha123",
      telefone: "11888888888",
      cpf: "08390763125",
    })).rejects.toBeInstanceOf(AppError);
  });

  it("deve criar um novo usuário com sucesso", async () => {
    const userData = {
      email: "novo@exemplo.com",
      nome: "Novo Usuário",
      password: "novaSenha123",
      telefone: "11888888888",
      cpf: "08390763125",
      dataDeNascimento: new Date("2014-01-01"),
    };

    const { user } = await sut.execute(userData);

    expect(user).toHaveProperty("id");
    expect(user.email).toBe(userData.email);
    expect(user.nome).toBe(userData.nome);
    expect(user.password).not.toBe(userData.password);
  });

  it("deve associar um funcionário ao cadastro e às ordens de serviço", async () => {
    const funcionarioId = "funcionario-id";
    const ordensDeServico = [
      {
        id: "ordem1",
        placaDoCarro: "ABC1234",
        servicosPrestados: "Troca de óleo",
        cpf: "08390763125",
        pecasUsadas: "Filtro de óleo",
        valorTotal: 50,
        dataDeRealizacao: new Date(),
        dataDeVencimento: new Date(),
        clienteId: "cliente-id",
        criadoPorId: funcionarioId,
        servicoId: undefined,
        aprovado: false,
        aprovadoPorId: funcionarioId,
      }
    ];

    const { user }  = await sut.execute({
      email: "funcionario@exemplo.com",
      nome: "Funcionario Teste",
      password: "senha123",
      telefone: "11999999999",
      cpf: "08390763125",
      dataDeNascimento: new Date("2014-01-01"),
      dataDeUltimaRevisao: new Date(),
      criadoPorId: funcionarioId,
      ordensDeServico: ordensDeServico,
      tipo: TipoCliente.COMUM,  // Inclua o tipo
    });

    expect(user).toHaveProperty("id");
    expect(user.criadoPorId).toBe(funcionarioId);
    
    const createdOrder = user.ordensDeServico?.[0];
    expect(createdOrder).toHaveProperty("criadoPorId", funcionarioId);
  });

  it("deve associar carros ao cliente corretamente", async () => {
    const clienteId = "cliente-id";
    const carros = [
      {
        id: "carro1",
        placa: "XYZ1234",
        modelo: "Modelo A",
        ano: 2020,
        clienteId: clienteId,
      }
    ];

    const { user } = await sut.execute({
      email: "cliente@exemplo.com",
      nome: "Cliente Teste",
      password: "senha123",
      telefone: "11999999999",
      cpf: "08390763125",
      dataDeNascimento: new Date("2014-01-01"),
      dataDeUltimaRevisao: new Date(),
      carros: carros,
      id: clienteId,
      tipo: TipoCliente.COMUM,  // Inclua o tipo
    });

    expect(user).toHaveProperty("id");
    expect(user.id).toBe(clienteId);

    const createdCar = user.carros?.[0];
    expect(createdCar).toHaveProperty("clienteId", clienteId);
  });

  it("deve associar uma ordem de serviço ao cliente e criar a ordem de serviço", async () => {
    const funcionarioId = "funcionario-id";
    const ordensDeServico = [
      {
        id: "ordem1",
        placaDoCarro: "ABC1234",
        servicosPrestados: "Troca de óleo",
        cpf: "08390763125",
        pecasUsadas: "Filtro de óleo",
        valorTotal: 50,
        dataDeRealizacao: new Date(),
        dataDeVencimento: new Date(),
        clienteId: "cliente-id",
        criadoPorId: funcionarioId,
        servicoId: undefined,
        aprovado: false,
        aprovadoPorId: funcionarioId,
      }
    ];

    // Cria um cliente com o ID "cliente-id" e associado com ordens de serviço
    const { user } = await sut.execute({
      email: "cliente@exemplo.com",
      nome: "Cliente Teste",
      password: "senha123",
      telefone: "11999999999",
      cpf: "08390763125",
      dataDeNascimento: new Date("2014-01-01"),
      ordensDeServico,
      id: "cliente-id",
      criadoPorId: funcionarioId,
      tipo: TipoCliente.COMUM,  // Inclua o tipo
    });

    // Verifica se o cliente foi criado com sucesso
    expect(user).toHaveProperty("id");
    expect(user.email).toBe("cliente@exemplo.com");

    // Verifica se a ordem de serviço foi criada e associada ao cliente
    const ordemDeServico = user.ordensDeServico?.[0];
    expect(ordemDeServico).toBeDefined();
    expect(ordemDeServico?.placaDoCarro).toBe("ABC1234");
    expect(ordemDeServico?.clienteId).toBe("cliente-id");
    expect(ordemDeServico?.criadoPorId).toBe(funcionarioId);
  });

  it("deve associar revisões ao cliente corretamente", async () => {
    const clienteId = "cliente-id";
    const revisoes = [
      {
        id: "revisao1",
        placaDoCarro: "XYZ1234",
        dataDaRevisao: new Date("2014-01-01"),
        dataDaProximaRevisao: undefined,
        mensagemPredefinida: "ola cliente",
        carroId: "carro1",
        clienteId: clienteId,
      }
    ];

    const { user } = await sut.execute({
      email: "cliente@exemplo.com",
      nome: "Cliente Teste",
      password: "senha123",
      telefone: "11999999999",
      cpf: "08390763125",
      dataDeNascimento: new Date("2014-01-01"),
      dataDeUltimaRevisao: new Date(),
      revisoes: revisoes,
      id: "cliente-id",
      tipo: TipoCliente.COMUM,  // Inclua o tipo
    });

    expect(user).toHaveProperty("id");
    expect(user.id).toBe(clienteId);

    const createdRevisao = user.revisoes?.[0];
    expect(createdRevisao).toHaveProperty("clienteId", clienteId);
    expect(createdRevisao).toHaveProperty("carroId", "carro1");
  });
});
