import { Request, Response, Application } from "express";
import { Category } from "../model/category";

class CreateRoutes {
  createCurse( req: Request, res: Response): Response {
    const { name, description } = req.body;
    const createdAt = new Date();

    const newCategory: Category = new Category();
      Object.assign(newCategory, {
        name,
        description
      })

    return res.json(newCategory);
  }
}

export default new CreateRoutes();
