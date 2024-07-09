import { Request, Response } from "express";
import { createCategoryUseCase } from "./createCategoryUsecase"; 
import {container} from "tsyringe"


export class CategoryController {
   
    async createCategory(req: Request, res: Response): Promise<Response> {
        try {
            const { name, description } = req.body;
            const CreateCategoryUseCase = container.resolve(createCategoryUseCase);
            await CreateCategoryUseCase.execute({ name, description });
            return res.status(201).send();
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message });
            } else {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }
}

