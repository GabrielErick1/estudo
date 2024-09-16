import { FastifyInstance } from 'fastify';
import { FuncionarioController } from '@/http/controllers/funcionarioRegisterController';
import { CadastroFuncionarioComCodigoController } from '@/http/controllers/superAdminControler';
import { authenticateFuncionarioByRole } from '@/Middleware/midellerFuncionario';

const Funcionario = new FuncionarioController();
const superadmin = new CadastroFuncionarioComCodigoController();

export const FuncionarioRoutes = async (app: FastifyInstance) => {
  app.post(
    '/funcionario',  {
      preHandler: async (request, reply) => {
        await authenticateFuncionarioByRole(request, reply, ['admin', 'moderador', 'super_admin', 'rh']);
      }
    }, Funcionario.registerFuncionario
  );
};

export const SuperadminRoutes = async (app: FastifyInstance) => {
  app.post('/superadmin', superadmin.registerSuperadmin);
};
