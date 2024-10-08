import { z } from 'zod';


const DateSchemas = z.string().transform((value) => {
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }
  return date;
});

// Enum Schemas
export const TipoClienteSchema = z.enum(['COMUM']);
export const TipoFuncionarioSchema = z.enum(['super_admin', 'moderador', 'admin', 'rh', 'estoque', 'funcionario']);
export const FormaPagamentoSchema = z.enum(['DINHEIRO', 'CARTAO', 'PIX']);
export const StatusOrdemSchema = z.enum(['EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA']);
export const TipoNotificacaoSchema = z.enum(['REVISAO', 'ORDEM_SERVICO', 'PROMOCAO']);

// Schemas para as interfaces

export const RegisterInterfaceSchema = z.object({
  id: z.string().optional(),
  nome: z.string(),
  email: z.string().email(),
  password: z.string(),
  dataDeNascimento: DateSchemas.optional(),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
  dataDeUltimaRevisao: z.date().optional(),
  telefone: z.string().optional(),
  tipo: TipoClienteSchema.default('COMUM'),
  criadoPorId: z.string().optional(), // ID do criador

  carros: z.array(z.object({
    id: z.string().optional(),
    placa: z.string(),
    modelo: z.string(),
    ano: z.number(),
    clienteId: z.string().optional(),
    revisoes: z.array(z.object({
      id: z.string().optional(),
      placaDoCarro: z.string(),
      dataDaRevisao: DateSchemas,
      dataDaProximaRevisao: z.date().optional(),
      mensagemPredefinida: z.string().optional(),
      carroId: z.string(),
      clienteId: z.string().optional(),
    })).optional(),
  })).optional(),

  ordensDeServico: z.array(z.object({
    id: z.string().optional(),
    placaDoCarro: z.string(),
    servicosPrestados: z.string(),
    cpf: z.string(),
    pecasUsadas: z.string(),
    valorTotal: z.number(),
    dataDeRealizacao: z.date(),
    dataDeVencimento: z.date(),
    clienteId: z.string(),
    criadoPorId: z.string(), // ID do criador da ordem
    aprovado: z.boolean(),
    aprovadoPorId: z.string().optional(),
    pagamentos: z.array(z.object({
      id: z.string().optional(),
      formaDePagamento: FormaPagamentoSchema,
      ordemDeServicoId: z.string(),
    })).optional(),
    servicoId: z.string().optional(),
    ordemDeEstoque: z.array(z.object({
      id: z.string().optional(),
      ordemDeServicoId: z.string().optional(),
      pecaAprovada: z.boolean(),
      mensagem: z.string().optional(),
      aprovadoPorId: z.string().optional(),
    })).optional(),
  })).optional(),

  revisoes: z.array(z.object({
    id: z.string().optional(),
    placaDoCarro: z.string(),
    dataDaRevisao: DateSchemas,
    dataDaProximaRevisao: z.date().optional(),
    mensagemPredefinida: z.string().optional(),
    carroId: z.string(),
    clienteId: z.string().optional(),
  })).optional(),
});

export const CarroInterfaceSchema = z.object({
  id: z.string().optional(),
  placa: z.string(),
  modelo: z.string(),
  ano: z.number(),
  clienteId: z.string(),
  revisoes: z.array(z.object({
    id: z.string().optional(),
    placaDoCarro: z.string(),
    dataDaRevisao: DateSchemas,
    dataDaProximaRevisao: z.date().optional(),
    mensagemPredefinida: z.string().optional(),
    carroId: z.string(),
    clienteId: z.string().optional(),
  })).optional(),
});

export const OrdemDeServicoInterfaceSchema = z.object({
  id: z.string().optional(),
  placaDoCarro: z.string(),
  servicosPrestados: z.string(),
  cpf: z.string(),
  pecasUsadas: z.string(),
  valorTotal: z.number(),
  dataDeRealizacao: z.date(),
  dataDeVencimento: z.date(),
  clienteId: z.string(),
  criadoPorId: z.string(), // ID do criador
  aprovado: z.boolean(),
  aprovadoPorId: z.string().optional(),
  pagamentos: z.array(z.object({
    id: z.string().optional(),
    formaDePagamento: FormaPagamentoSchema,
    ordemDeServicoId: z.string(),
  })).optional(),
  servicoId: z.string().optional(),
  ordemDeEstoque: z.array(z.object({
    id: z.string().optional(),
    ordemDeServicoId: z.string().optional(),
    pecaAprovada: z.boolean(),
    mensagem: z.string().optional(),
    aprovadoPorId: z.string().optional(),
  })).optional(),
});

export const RevisaoInterfaceSchema = z.object({
  id: z.string().optional(),
  placaDoCarro: z.string(),
  dataDaRevisao: z.date(),
  dataDaProximaRevisao: z.date().optional(),
  mensagemPredefinida: z.string().optional(),
  carroId: z.string(),
  clienteId: z.string().optional(),
});

export const PagamentoInterfaceSchema = z.object({
  id: z.string().optional(),
  formaDePagamento: FormaPagamentoSchema,
  ordemDeServicoId: z.string(),
});

export const OrdemEstoqueInterfaceSchema = z.object({
  id: z.string().optional(),
  ordemDeServicoId: z.string().optional(),
  pecaAprovada: z.boolean(),
  mensagem: z.string().optional(),
  aprovadoPorId: z.string().optional(),
});



// Definição do schema de FuncionarioInterface
export const FuncionarioInterfaceSchema = z.object({
  id: z.string().optional(),
  nome: z.string(),
  username: z.string(),
  cpf: z.string(),
  codigoRegistro: z.string().optional(),
  dataDeNascimento: DateSchemas, // Usa o DateSchema para transformar a string em Date
  email: z.string().email(),
  telefone: z.string().optional(),
  senha: z.string(),
  tipo: TipoFuncionarioSchema,
  clientesCriados: z.array(RegisterInterfaceSchema).optional(),
  ordensCriadas: z.array(OrdemDeServicoInterfaceSchema).optional(),
  ordensAprovadas: z.array(OrdemDeServicoInterfaceSchema).optional(),
  pecasCriadas: z.array(z.object({
    id: z.string().optional(),
    nome: z.string(),
    tipo: z.string(),
    valor: z.number(),
    quantidade: z.number(),
    criadoPorId: z.string(), // ID do criador da peça
  })).optional(),
  servicosExecutados: z.array(RegisterInterfaceSchema).optional(),
  ordensDeEstoque: z.array(OrdemEstoqueInterfaceSchema).optional(),
});

export const PecaInterfaceSchema = z.object({
  id: z.string().optional(),
  nome: z.string(),
  tipo: z.string(),
  valor: z.number(),
  quantidade: z.number(),
  criadoPorId: z.string(), // ID do criador da peça
});

export const ServicoInterfaceSchema = z.object({
  id: z.string().optional(),
  tipoDeServico: z.string(),
  valor: z.number(),
  ordensDeServico: z.array(OrdemDeServicoInterfaceSchema).optional(),
});
