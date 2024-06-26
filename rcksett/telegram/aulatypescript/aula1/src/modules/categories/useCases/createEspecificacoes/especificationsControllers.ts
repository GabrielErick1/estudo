import {Request, Response} from "express"
import { createEspecificationsService } from "./createEspecificationsUsecase"

class EspecificacoesCController  {
  private CreateEspecifications : createEspecificationsService;
  constructor(CreateEspecificationsData : createEspecificationsService) {
    this.CreateEspecifications =  CreateEspecificationsData;
  }

  handle(req: Request, res: Response): Response{
    const { name, description } = req.body;
    this.CreateEspecifications.execulte({name, description});
    return res.status(201).send();
  }
}
export {EspecificacoesCController}