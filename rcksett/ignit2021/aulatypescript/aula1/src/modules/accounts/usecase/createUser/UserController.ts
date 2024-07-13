import { AccountUsercase } from "./userUseCase";
import {Request, Response} from "express"
import {container} from "tsyringe"

export class UserController {
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { email, name, username, password, driver_licence } = req.body;

      
      const CreateUserUseCase = container.resolve(AccountUsercase);
      await CreateUserUseCase.execulte({ email,name,username,password,driver_licence });
      return res.status(201).send();
    } catch (error) {
      if(error instanceof Error){
        return res.status(400).json({ error: error.message });
      }else {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      
    }
  }
}