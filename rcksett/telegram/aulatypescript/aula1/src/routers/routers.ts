import { Router, Request, Response } from "express";
import {CategoryController} from "../modules/categories/useCases/createCategory/categoryControllers"
import { Especifications } from "../modules/categories/repositories/Especifications";
import { createEspecificationsService } from "../modules/categories/services/createEspecificationsService"

const categoryCreate = new  CategoryController()
const route = Router();
const EspecifficationRepos = new Especifications()
route.post("/curse", categoryCreate.createCategory);

route.post("/especi", (req: Request, res: Response) => {
  const { name, description } = req.body;
  const EspecificationsService = new createEspecificationsService(EspecifficationRepos);
  EspecificationsService.execulte({name, description})
  return res.status(201).send();
});

route.get("/curse", categoryCreate.viewCategory);

export default route;
