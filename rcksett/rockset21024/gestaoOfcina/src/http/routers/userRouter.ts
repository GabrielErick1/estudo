import { Register } from '@/http/controllers/registerControler';
import { FastifyInstance } from 'fastify';
import {authenticateSuperAdmin} from "@/Middleware/clienteMidellers"
export const userRoutes = async (app: FastifyInstance) => {
  
  app.post('/cliente-register', Register);
 // app.post('/altenticate-cliente',  authenticateSuperAdmin, )
};
