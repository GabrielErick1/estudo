import { FuncionarioController } from '@/http/controllers/funcionarioRegisterController';
import { CadastroFuncionarioComCodigoController } from '@/http/controllers/superAdminControler';
import { FastifyInstance } from 'fastify';
const Funcionario = new FuncionarioController();

const superadmin = new CadastroFuncionarioComCodigoController();
export const FuncionarioRoutes = async (app: FastifyInstance) => {
  app.post('/func', Funcionario.registerFuncionario);
};

export const SuperadminRoutes = async (app: FastifyInstance) => {
  app.post('/superadmin', superadmin.registerSuperadmin);
};
