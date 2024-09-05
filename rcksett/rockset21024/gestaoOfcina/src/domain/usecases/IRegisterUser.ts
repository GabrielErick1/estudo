/*import { Carro, OrdemDeServico, Revisao } from "@prisma/client";

export interface RegisterInterface {
  id?: string;
  nome: string;
  email: string;
  cpf:   string;
  dataDeNascimento: Date;
  password: string;
  telefone?: string;
  placaDoCarro?: string;
  dataDeUltimaRevisao?: Date;
  tipo?: string;
  clienteCadastrador?: string;
  criadoPorId?: string;
  carros?: Carro[];  // Altere para uma lista de Carro
  ordensDeServico?: OrdemDeServico[]; // Altere para uma lista de OrdemDeServico
  revisoes?: Revisao[]; // Altere para uma lista de Revisao
}
*/

export enum TipoCliente {
  COMUM = "COMUM",
}

export enum TipoFuncionario {
  SUPER_ADMIN = "super_admin",
  MODERADOR = "moderador",
  ADMIN = "admin",
  FUNCIONARIO = "funcionario",
  RH = "rh",
  ESTOQUE = "estoque",
}

export enum FormaPagamento {
  DINHEIRO = "DINHEIRO",
  CARTAO = "CARTAO",
  PIX = "Pix",
}

export interface RegisterInterface {
  id?: string;
  nome: string;
  email: string;
  password: string;
  cpf?: string;
  cnpj?: string;
  dataDeNascimento?: Date;
  dataDeUltimaRevisao?: Date;
  clienteCadastrador?: string;
  telefone?: string;
  tipo?: TipoCliente;
  criadoPorId?: string;
  carros?: CarroInterface[];
  ordensDeServico?: OrdemDeServicoInterface[];
  revisoes?: RevisaoInterface[] | undefined;
}


export interface CarroInterface {
  id?: string;
  placa: string;
  modelo: string;
  ano: number;
  clienteId: string; 
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
  dataDaProximaRevisao?: Date | null; // Permite null
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
  dataDeNascimento: Date;
  email: string;
  senha: string;
  tipo: TipoFuncionario;
  clientesCriados?: RegisterInterface[]; 
  ordensCriadas?: OrdemDeServicoInterface[]; 
  ordensAprovadas?: OrdemDeServicoInterface[]; 
  pecasCriadas?: PecaInterface[]; 
  servicosExecutados?: RegisterInterface[]; 
  ordensDeEstoque?: OrdemEstoqueInterface[]; 
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


/*
model Funcionario {
  clientesCriados    Cliente[]        @relation("ClienteCriadoPorFuncionario")
  ordensCriadas      OrdemDeServico[] @relation("OrdemDeServicoCriadaPorFuncionario")
  ordensAprovadas    OrdemDeServico[] @relation("AprovadoPor")
  pecasCriadas       Peca[]           @relation("PecasCriadas")
  servicosExecutados Cliente[]        @relation("ServicosExecutadosPorFuncionarios")

  // Relacionamento para gestão de estoque
  ordensDeEstoque OrdemEstoque[] @relation("OrdemDeEstoqueGerenciadaPor")

  @@map("funcionarios")
}
*/

/*
export interface RegisterInterface {
  id?: string;
  tipo?: string;
  email: string;
  nome: string;
  password: string;
  telefone?: string;
  placaDoCarro?: string;
  dataDeUltimaRevisao?: Date;
  clienteCadastrador?: string;
  criadoPorId?: string;
  carros: Array<{
    placa: string;
    modelo: string;
    ano: number;
  }> ;
  ordensDeServico?: Array<{
    placaDoCarro: string;
    servicosPrestados: string;
    pecasUsadas: string;
    valorTotal: number;
    dataDeRealizacao: Date;
    dataDeVencimento: Date;
    formaDePagamento: string[] ; 
  }> | undefined;
  revisoes?: Array<{
    placaDoCarro: string;
    dataDaRevisao: Date;
    dataDaProximaRevisao: Date;
    mensagemPredefinida?: string;
    carroId: string;
  }> | undefined;
}*/