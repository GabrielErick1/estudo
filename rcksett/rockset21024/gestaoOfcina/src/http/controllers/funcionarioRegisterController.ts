import { FastifyRequest, FastifyReply } from "fastify";


export class FuncionarioController {
  
      
    async registerFuncionario(req: FastifyRequest, res: FastifyReply) {
        const parseDate = (date: any): Date | null => {
            const parsedDate = new Date(date);
            return isNaN(parsedDate.getTime()) ? null : parsedDate;
          }
    }
}