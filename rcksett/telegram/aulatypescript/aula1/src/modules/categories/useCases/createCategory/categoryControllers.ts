import { Request, Response } from "express";
import { createCategoryUseCase } from "./createCategoryUsecase"; 
import { categoriesRepositories } from "../../repositories/categories"; 

export class CategoryController {
    private createCategoryService: createCategoryUseCase;
    private categoriesRepo = new categoriesRepositories();
    constructor() {
        this.createCategoryService = new createCategoryUseCase(this.categoriesRepo);
        this.createCategory = this.createCategory.bind(this);
        this.viewCategory = this.viewCategory.bind(this);
    }
    createCategory(req: Request, res: Response): Response {
        const { name, description } = req.body;
            this.createCategoryService.execute({ name, description });
            return res.status(201).send();
       
    }

    viewCategory(req: Request, res: Response): Response {
        const viewCategory = this.categoriesRepo.ViweCategory(); 
        return res.json(viewCategory);
    }
}

