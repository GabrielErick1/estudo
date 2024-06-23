import { Router, Request, Response } from "express";
import { createCategoryService } from "../../services/createCategorySservice"; 
import { categoriesRepositories } from "../../repositories/categories"; 


const categoriesRepo = new categoriesRepositories();

export class CategoryController {
    private createCategoryService: createCategoryService;

    constructor() {
        this.createCategoryService = new createCategoryService(categoriesRepo);
        this.createCategory = this.createCategory.bind(this);
        this.viewCategory = this.viewCategory.bind(this);
    }
    createCategory(req: Request, res: Response): Response {
        const { name, description } = req.body;
            this.createCategoryService.execute({ name, description });
            return res.status(201).send();
       
    }

    viewCategory(req: Request, res: Response): Response {
        const viewCategory = categoriesRepo.ViweCategory(); 
        return res.json(viewCategory);
    }
}

