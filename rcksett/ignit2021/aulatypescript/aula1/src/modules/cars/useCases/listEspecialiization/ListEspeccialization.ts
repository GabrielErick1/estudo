import { EspecializationUsecase } from "./EspecializationUseCase"
import { container } from "tsyringe"
import { Request, Response } from "express";
export class ListEspecialization {
   async ListEspecialization(req: Request, res: Response): Promise<Response> {
    const getEspecialization = container.resolve(EspecializationUsecase)
    const getEspecializationResult = await getEspecialization.execulte()

      return res.json(getEspecializationResult);
  }
}