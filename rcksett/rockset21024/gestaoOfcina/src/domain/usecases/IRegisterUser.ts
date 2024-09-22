

export enum TipoCliente {
  COMUM = "COMUM",
}

export enum TipoFuncionario {
  SUPER_ADMIN = "super_admin",
  MODERADOR = "moderador",
  ADMIN = "admin",
  RH = "rh",
  ESTOQUE = "estoque",
  FUNCIONARIO = "funcionario"
}

export enum FormaPagamento {
  DINHEIRO = "DINHEIRO",
  CARTAO = "CARTAO",
  PIX = "PIX",
}

export enum StatusOrdem {
  EM_ANDAMENTO = "EM_ANDAMENTO",
  CONCLUIDA = "CONCLUIDA",
  CANCELADA = "CANCELADA",
}

export enum TipoNotificacao {
  REVISAO = "REVISAO",
  ORDEM_SERVICO = "ORDEM_SERVICO",
  PROMOCAO = "PROMOCAO",
}




export interface RegisterInterface {
  id?: string;
  nome: string;
  telefone?: string | null;  // Permitir null
  email: string;
  cpf?: string | null;       // Permitir null
  cnpj?: string | null;      // Permitir null
  dataDeNascimento?: Date | null; // Permitir null
  password: string;
  tipo?: TipoCliente;
  carros?: CarroInterface[]; 
  ordensDeServico?: OrdemDeServicoInterface[]; 
  revisoes?: RevisaoInterface[]; 
  criadoPorId?: string | null;  // Permitir null
  criadoPor?: FuncionarioInterface | null;  // Permitir null
  funcionariosExecutores?: FuncionarioInterface[];
}


export interface CarroInterface {
  id?: string;
  placa: string;
  modelo: string;
  ano: number;
  clienteId?: string; 
  revisoes?: RevisaoInterface[]; 
}

export interface OrdemDeServicoInterface {
  id?: string;
  placaDoCarro: string;
  servicosPrestados: string;
  cpf: string;
  pecasUsadas: string;
  valorTotal: number;
  dataDeRealizacao: Date;
  dataDeVencimento: Date;
  clienteId: string;
  criadoPorId: string; 
  aprovado: boolean;
  aprovadoPorId?: string; 
  pagamentos?: PagamentoInterface[]; 
  servicoId?: string; 
  ordemDeEstoque?: OrdemEstoqueInterface[]; 
}

export interface RevisaoInterface {
  id?: string;
  placaDoCarro: string;
  dataDaRevisao: Date;
  dataDaProximaRevisao?: Date; // Permite null
  mensagemPredefinida?: string;
  carroId: string;
  clienteId?: string;
}

export interface PagamentoInterface {
  id?: string;
  formaDePagamento: FormaPagamento; 
  ordemDeServicoId: string;
}

export interface OrdemEstoqueInterface {
  id?: string;
  ordemDeServicoId?: string;
  pecaAprovada: boolean;
  mensagem?: string;
  aprovadoPorId?: string;
}
export interface FuncionarioInterface {
  id?: string;
  nome: string;
  username: string;
  cpf: string;
  codigoRegistro?: string;
  dataDeNascimento: Date;
  telefone?: string;
  email: string;
  senha: string;
  tipo: TipoFuncionario;
  clientesCriados?: RegisterInterface[]; // Relacionamento com clientes criados
  ordensCriadas?: OrdemDeServicoInterface[]; 
  ordensAprovadas?: OrdemDeServicoInterface[];
  pecasCriadas?: PecaInterface[];
  servicosExecutados?: RegisterInterface[]; 
  ordensDeEstoque?: OrdemEstoqueInterface[];
  criadoPorId?: string; // ID opcional do criador
  criadoPor?: FuncionarioInterface; // Funcionario criador opcional 
}

export interface PecaInterface {
  id?: string;
  nome: string;
  tipo: string;
  valor: number;
  quantidade: number;
  criadoPorId: string;
}

export interface ServicoInterface {
  id?: string;
  tipoDeServico: string;
  valor: number;
  ordensDeServico?: OrdemDeServicoInterface[];
}

export interface OrdemEstoqueInterface {
  id?: string;
  ordemDeServicoId?: string;
  pecaAprovada: boolean;
  mensagem?: string;
  aprovadoPorId?: string;
}