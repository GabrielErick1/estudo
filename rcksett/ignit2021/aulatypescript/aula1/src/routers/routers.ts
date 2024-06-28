import { Router, Request, Response } from "express";
import { categoryRoutes } from "../modules/cars/useCases/createCategory/index";
import { ListcategoryRoutes } from "../modules/cars/useCases/ListCategory/index";
import { EspecificationsController } from "../modules/cars/useCases/createEspecificacoes/index";
import multer from "multer";
import { fileCategoryHandle } from "../modules/cars/useCases/fileCategory";
const upload = multer({
  dest: "./tmp"
});

const route = Router();

route.post("/curse", (req, res) => {
  return categoryRoutes.createCategory(req, res);
});

route.post("/especi", (req: Request, res: Response) => {
  return EspecificationsController.handle(req, res);
});

route.post("/import", upload.single("file"), (req: Request, res: Response) => {
  fileCategoryHandle.handle(req, res);
});

route.get("/curse", (req, res) => {
  return ListcategoryRoutes.List(req, res);
});

export default route;
