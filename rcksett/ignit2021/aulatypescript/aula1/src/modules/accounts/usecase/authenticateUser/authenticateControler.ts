import { AuthenticateUserCase } from "./authenticateUserCase";
import { container } from "tsyringe";
import { Request, Response } from "express";

class AuthenticateUserController {
  async authenticate(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password, email } = req.body;
      const authenticateUser = container.resolve(AuthenticateUserCase); 
      const { token, user } = await authenticateUser.execute({ username, password, email });
      return res.status(200).json({ token, user });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ message: error.message });
       }else {
         return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
}

export { AuthenticateUserController };
