import { Request, Response, Application } from "express";
import { v4 as uuidv4 } from 'uuid';
import createCurse from "../model/createCurse";

class CreateRoutes {
  constructor(app: Application) {
    this.registerRoutes(app);
  }

  registerRoutes(app: Application): void {
    app.post('/curse', this.createCurse);
  }

  createCurse(req: Request, res: Response): Response {
    const { name, description, education, duration } = req.body;

    const newCurse = {
      id: uuidv4(),
      name,
      description,
      education,
      duration
    };

    return res.json(newCurse);
  }
}

export default CreateRoutes;