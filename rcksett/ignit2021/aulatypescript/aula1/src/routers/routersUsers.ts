import { Router } from "express";
import {ensureAuthenticates} from "../middlewares/ensureAuthenticates"
import {AvatarController} from "../modules/accounts/usecase/updateUserAvatar/avatarController"
import uploadConfig  from "../config/upload"
import multer from "multer"

const upload = multer(uploadConfig.upload("./avatar"));
const routesUsers = Router();
const avatarUsers = new AvatarController()


routesUsers.patch("/users/avatar", ensureAuthenticates, upload.single("file"), avatarUsers.updateUserAvatar);

export {routesUsers};