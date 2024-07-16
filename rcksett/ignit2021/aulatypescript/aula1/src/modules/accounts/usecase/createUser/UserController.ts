import { AccountUsercase } from "./userUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../errors/appError";

export class UserController {
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { email, name, username, password, driver_licence } = req.body;

      const createUserUseCase = container.resolve(AccountUsercase);
      await createUserUseCase.execute({ email, name, username, password, driver_licence });

      return res.status(201).send();
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res.status(500).json({ error});
      }
    }
  }
}
