import { Request, Response } from "express";
import { ListCategoryUseCase } from "./listCategoreUsecase"; 

export class ListCategory {
  constructor( private CreateCategoryUseCase: ListCategoryUseCase) {}
  List(req: Request, res: Response): Response {
    const { name, description } = req.body;
    const viewCategory =  this.CreateCategoryUseCase.execute()
        return res.json(viewCategory);
  } 
}