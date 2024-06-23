import { Router, Request, Response } from "express";
import {categoryRoutes} from "../modules/categories/useCases/createCategory/index"
import {ListcategoryRoutes} from "../modules/categories/useCases/ListCategory/index"
import { Especifications } from "../modules/categories/repositories/Especifications";
import { createEspecificationsService } from "../modules/categories/services/createEspecificationsService"



const route = Router();
const EspecifficationRepos = new Especifications()
route.post("/curse", (req, res) => {
 return categoryRoutes.createCategory(req, res)
});

route.post("/especi", (req: Request, res: Response) => {
  const { name, description } = req.body;
  const EspecificationsService = new createEspecificationsService(EspecifficationRepos);
  EspecificationsService.execulte({name, description})
  return res.status(201).send();
});

route.get("/curse", (req, res)=>{
 return ListcategoryRoutes.List(req, res)
});

export default route;
