import { Router, Request, Response } from "express";
import {CategoryController} from "../modules/cars/useCases/createCategory/categoryControllers"
import { ListCategory } from "../modules/cars/useCases/ListCategory/listCategory";
import { fileCategory } from "../modules/cars/useCases/fileCategory/fileCategory";
import uploadConfig from "../config/upload"
import {ensureAuthenticates} from "../middlewares/ensureAuthenticates"

import multer from "multer";
const createCategoryController = new CategoryController()
const fileCategoryHandle = new fileCategory()
const listCategory = new ListCategory()
const upload = multer(uploadConfig.upload("./tmp/fileCategory"));

const CategoryRoutes = Router();
CategoryRoutes.post("/category", ensureAuthenticates, createCategoryController.createCategory);
CategoryRoutes.get("/category", ensureAuthenticates, listCategory.List);
CategoryRoutes.post("/category/import", ensureAuthenticates, upload.single("file"), (req: Request, res: Response) => {
  fileCategoryHandle.handle(req, res);
});


export {CategoryRoutes};
