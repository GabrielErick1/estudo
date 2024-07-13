import { Router, Request, Response } from "express";
import {CategoryController} from "../modules/cars/useCases/createCategory/categoryControllers"
import { ListCategory } from "../modules/cars/useCases/ListCategory/listCategory";
import { EspecificacoesCController } from "../modules/cars/useCases/createEspecificacoes/especificationsControllers";
import { fileCategory } from "../modules/cars/useCases/fileCategory/fileCategory";
import { ListEspecialization } from "../modules/cars/useCases/listEspecialiization/ListEspeccialization";
import {UserController} from "../modules/accounts/usecase/createUser/UserController"


import multer from "multer";
const createCategoryController = new CategoryController()
const createEspecificacoesCController = new EspecificacoesCController()
const fileCategoryHandle = new fileCategory()
const listCategory = new ListCategory()
const listEspecializations = new ListEspecialization()
const userController = new UserController()
const upload = multer({
  dest: "./tmp"
});

const route = Router();

route.post("/category", createCategoryController.createCategory);
route.get("/category", listCategory.List);
route.post("/category/import", upload.single("file"), (req: Request, res: Response) => {
  fileCategoryHandle.handle(req, res);
});

route.post("/especi", createEspecificacoesCController.handle);
route.get("/especi", listEspecializations.ListEspecialization);


route.post("/users",   userController.createUser);

export default route;
