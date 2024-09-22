import {FastifyReply, FastifyRequest} from "fastify"
import {clientZod} from "@/domain/usecases/altenticateZod"
import { AppError } from "@/utils/AppError";


class AltenticateClientController {
    handle(req: FastifyRequest, res:FastifyReply){
        try {
            const parsed = clientZod.safeParse(req.body)

        if (!parsed.success) {
            return res.status(400).send({
                message: "Dados inválidos.",
                errors: parsed.error.errors,
            });
        }
        const {email, password} = parsed.data;

        }catch(err){
            if (err instanceof AppError) {
                console.log(err);
                
                return res.status(err.statusCode).send({ message: err.message });
            } else {
                console.log(err);
                return res.status(500).send({ message: "Internal server error" });
            }
        }
        
    }

}