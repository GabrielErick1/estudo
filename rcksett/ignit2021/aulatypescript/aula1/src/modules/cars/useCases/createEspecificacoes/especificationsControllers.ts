import {Request, Response} from "express"
import { createEspecificationsService } from "./createEspecificationsUsecase"
import {container} from "tsyringe"

class EspecificacoesCController  {
   async handle(req: Request, res: Response): Promise<Response>  {
    try {
      const { name, description } = req.body;
      const CreateEspecifications = container.resolve(createEspecificationsService);
      await CreateEspecifications.execulte({name, description});
      return res.status(201).send();
    }catch(error){
      if(error instanceof Error){
        return res.status(400).json({message: error.message})
       }else{
        return res.status(500).json({message: "Internal Server Error"})
      }
    }
    
  }
}
export {EspecificacoesCController}