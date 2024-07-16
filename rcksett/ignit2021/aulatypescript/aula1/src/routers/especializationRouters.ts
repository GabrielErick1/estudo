import { Router, Request, Response } from "express";
import { ListEspecialization } from "../modules/cars/useCases/listEspecialiization/ListEspeccialization";
import { EspecificacoesCController } from "../modules/cars/useCases/createEspecificacoes/especificationsControllers";

const SpecializationRouters = Router();

const listEspecializations = new ListEspecialization()
const createEspecificacoesCController = new EspecificacoesCController()


SpecializationRouters.post("/especi", createEspecificacoesCController.handle);
SpecializationRouters.get("/especi", listEspecializations.ListEspecialization);

export {SpecializationRouters}