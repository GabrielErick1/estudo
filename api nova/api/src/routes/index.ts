import { Router } from "express";
import {userControllers} from '../useCases/createUser/userControllers'
const router: Router = Router()
router.get("/", (req, res)=> {
  res.send('ola mundo')
});

export { router };