import { Request, Response } from "express";
import { ListCategoryUseCase } from "./listCategoreUsecase"; 
import {container} from "tsyringe"
export class ListCategory {

  async List(req: Request, res: Response): Promise<Response> {
    const CreateCategoryUseCase = container.resolve(ListCategoryUseCase);  
    const viewCategory = await CreateCategoryUseCase.execute()
        return res.json(viewCategory);
  } 
}