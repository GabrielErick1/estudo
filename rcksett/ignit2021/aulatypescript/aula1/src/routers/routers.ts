import { Router, Request, Response } from "express";
import {CategoryController} from "../modules/cars/useCases/createCategory/categoryControllers"
import { ListCategory } from "../modules/cars/useCases/ListCategory/listCategory";
import { EspecificacoesCController } from "../modules/cars/useCases/createEspecificacoes/especificationsControllers";
import { fileCategory } from "../modules/cars/useCases/fileCategory/fileCategory";


import multer from "multer";
const createCategoryController = new CategoryController()
const createEspecificacoesCController = new EspecificacoesCController()
const fileCategoryHandle = new fileCategory()
const listCategory = new ListCategory()
const upload = multer({
  dest: "./tmp"
});

const route = Router();

route.post("/curse", createCategoryController.createCategory);

route.post("/especi", createEspecificacoesCController.handle);

route.post("/import", upload.single("file"), (req: Request, res: Response) => {
  fileCategoryHandle.handle(req, res);
});

route.get("/curse", (req, res) => {
  return listCategory.List(req, res);
});

export default route;
