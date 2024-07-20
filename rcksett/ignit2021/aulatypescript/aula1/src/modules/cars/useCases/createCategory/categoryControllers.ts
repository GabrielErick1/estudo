import { Request, Response } from "express";
import { createCategoryUseCase } from "./createCategoryUsecase"; 
import {container} from "tsyringe"
import { AppError } from "../../../../errors/appError";

export class CategoryController {
   
    async createCategory(req: Request, res: Response): Promise<Response> {
        try {
            const { name, description } = req.body;
            const CreateCategoryUseCase = container.resolve(createCategoryUseCase);
            await CreateCategoryUseCase.execute({ name, description });
            return res.status(201).send();
        } catch (err: unknown) {
            if (err instanceof AppError) {
                return res.status(err.statusCode).json({ error: err.message });
            } else {
                // Handle other types of errors
                return res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}

