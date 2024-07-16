import { Router } from "express";
import {AuthenticateUserController} from "../modules/accounts/usecase/authenticateUser/authenticateControler"
import {UserController} from "../modules/accounts/usecase/createUser/UserController"

const routeAutenticate = Router();
const AuthenticateUser = new AuthenticateUserController()
const userController = new UserController()

routeAutenticate.post("/sessions", AuthenticateUser.authenticate);
routeAutenticate.post("/users",    userController.createUser);

export  {routeAutenticate};
