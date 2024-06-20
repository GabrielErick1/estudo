import {Request, Response} from "express"
import createCurse from "../model/createCurse"

class CreateRoutes{
   app(req: Request, res: Response){
    const {name, description, education, duration} = req.body
    console.log(name);
    
    createCurse.execute({
      name,
      description,
      education,
      duration
    })
    return res.json({
      name,
      description,
      education,
      duration
    })
   }
}

export default new CreateRoutes();