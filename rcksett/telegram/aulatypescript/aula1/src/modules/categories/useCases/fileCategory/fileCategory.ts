import {Request, Response} from "express"
import {FileCategoryUseCase} from "./CategoryUsecaase";
class fileCategory {

  constructor(private fileCategoryService: FileCategoryUseCase){}
  handle(req: Request, res: Response): Response{
    const { file } = req;
    if(file){
      this.fileCategoryService.execute(file)
      return res.status(201).send();
    }
    return res.status(400).send()
  }
}

export {fileCategory}