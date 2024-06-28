import { Request, Response } from "express";
import { createCategoryUseCase } from "./createCategoryUsecase"; 

export class CategoryController {
    constructor( private CreateCategoryUseCase: createCategoryUseCase) {}
    createCategory(req: Request, res: Response): Response {
        const { name, description } = req.body;
            this.CreateCategoryUseCase.execute({ name, description });
            return res.status(201).send();
    }
}

