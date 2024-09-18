import { FastifyInstance } from 'fastify';
import { FuncionarioController } from '@/http/controllers/funcionarioRegisterController';
import { AuthController } from '@/http/controllers/AltenticateController';
import { CadastroFuncionarioComCodigoController } from '@/http/controllers/superAdminControler';
import { authenticateFuncionarioByRole } from '@/Middleware/midellerFuncionario';

const funcionarioController = new FuncionarioController();
const superadminController = new CadastroFuncionarioComCodigoController();
const authController = new AuthController();

export const FuncionarioRoutes = async (app: FastifyInstance) => {
  app.post(
    '/funcionario',
    {
      preHandler: async (request, reply) => {
        await authenticateFuncionarioByRole(request, reply, ['admin', 'moderador', 'super_admin', 'rh']);
      },
    },
    funcionarioController.registerFuncionario
  );

  app.post('/usersaltenticate', authController.handle);
};

export const SuperadminRoutes = async (app: FastifyInstance) => {
  app.post('/superadmin', superadminController.registerSuperadmin);
};
