import fastify  from "fastify";
export const app = fastify();
import {userRoutes} from "../http/routers/userRouter"
import {FuncionarioRoutes, SuperadminRoutes} from "../http/routers/funcionarioRouter"
import { ZodError } from "zod";
import { env } from "@/env/index";

app.register(userRoutes);
app.register(FuncionarioRoutes)
app.register(SuperadminRoutes)

app.setErrorHandler((error, request, reply) => {
    if(error instanceof ZodError){
        reply.status(400).send({message: "VALIDATION ERROR", issues: error.format()});
    } 
     if(env.NODE_ENV !== "production"){
        console.error(error);
     }
        reply.status(500).send({message: "Internal Server Error"});

});



