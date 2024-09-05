# Oficina

## Visão Geral

O projeto **"Oficina"** é um sistema de gerenciamento para oficinas de carros, que inclui funcionalidades para cadastro e gerenciamento de clientes, ordens de serviço, carros, revisões e estoque. O sistema é construído com Node.js e TypeScript, utilizando PostgreSQL como banco de dados e Prisma como ORM.

## Requisitos Funcionais

- [ ] **Cadastro de Usuário**: Usuários devem ser capazes de se cadastrar com informações básicas.
- [ ] **Login**: Usuários devem ser capazes de fazer login com email e senha.
- [ ] **Perfil do Usuário**: Usuários logados devem poder acessar seu perfil.
- [ ] **Gerenciamento de Clientes**: Permitir cadastro e gerenciamento de clientes.
- [ ] **Gerenciamento de Carros**: Associar carros aos clientes e registrar informações sobre eles.
- [ ] **Ordens de Serviço**: Criar, gerenciar e acompanhar ordens de serviço, incluindo status e pagamentos.
- [ ] **Revisões**: Agendar e registrar revisões dos carros.
- [ ] **Estoque**: Gerenciar peças e ordens de estoque.

## Requisitos Não Funcionais

- [ ] **Criptografia de Senha**: Senhas devem ser armazenadas de forma criptografada usando bcrypt.
- [ ] **Banco de Dados**: Utilização do PostgreSQL para armazenamento de dados.
- [ ] **ORM**: Utilização do Prisma ORM para gerenciamento de dados e mapeamento objeto-relacional.

## Regras de Negócio

- [ ] **Email Único**: O sistema deve garantir que um email seja único para cada usuário.
- [ ] **Autorização e Permissões**: Diferentes níveis de permissões para funcionários e administradores.
- [ ] **Notificações**: Enviar notificações aos clientes sobre revisões e ordens de serviço.

## Tecnologias Utilizadas

- [ ] **Backend**: Node.js com TypeScript
- [ ] **Banco de Dados**: PostgreSQL
- [ ] **ORM**: Prisma
- [ ] **Criptografia**: bcrypt para hashing de senhas
- [ ] **Validação**: Zod para validação dos dados de entrada
- [ ] **Testes**: Vitest para testes unitários e integração
- [ ] **Framework**: Fastify para gerenciamento de requisições HTTP

## Estrutura do Projeto

### Modelos

Os modelos de dados são definidos no schema Prisma e incluem:

- [ ] **Cliente**: Informações do cliente, incluindo dados pessoais e histórico de serviços.
- [ ] **Carro**: Dados do carro, associados a um cliente.
- [ ] **OrdemDeServico**: Detalhes da ordem de serviço, incluindo status e pagamentos.
- [ ] **Revisao**: Informações sobre revisões programadas e realizadas.
- [ ] **Peca**: Itens de estoque utilizados em ordens de serviço.
- [ ] **Funcionario**: Dados do funcionário e suas permissões.
- [ ] **OrdemEstoque**: Controle de peças no estoque.

### Repositórios

A camada de acesso a dados é gerenciada pelo Prisma. As operações de CRUD são realizadas através da classe `PrismaUserRepository`.

### Controllers

Os controllers são responsáveis por manipular requisições HTTP e aplicar a lógica de negócio. O controller de registro de usuários, por exemplo, lida com a validação dos dados e a criação de novos usuários.

### Validação

Utilizamos o Zod para validar as entradas do usuário e garantir que os dados estejam no formato correto antes de serem processados.

## Funcionalidades Adicionais

- [ ] **Notificações via WhatsApp**: Enviar notificações para clientes sobre a data da próxima revisão e mudanças no status das ordens de serviço.
- [ ] **Promoções de Serviços**: Notificar os clientes sobre promoções em serviços disponíveis.
- [ ] **Cadastro Opcional**: Permitir que clientes se cadastrem sem a necessidade de fornecer informações sobre carros ou ordens de serviço.



