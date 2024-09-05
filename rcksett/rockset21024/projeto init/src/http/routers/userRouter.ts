import { Register } from '@/http/controllers/registerControler';
import { FastifyInstance } from 'fastify';

export const userRoutes = async (app: FastifyInstance) => {
  app.post('/users', Register);
};
