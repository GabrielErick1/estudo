import {EspecificacoesCController} from "./especificationsControllers"
import { createEspecificationsService} from "./createEspecificationsUsecase"
import { Especifications } from "../../repositories/implement/Especifications";



const EspecifficationRepos = new Especifications()

const EspecificationsService = new createEspecificationsService(EspecifficationRepos)

const EspecificationsController = new EspecificacoesCController(EspecificationsService)

export {EspecificationsController}