import { AppError } from "../../../../errors/appError";
import { RepositoryInverse } from "../../repositories/InverseDependencyRepository";
import {inject, injectable} from "tsyringe"

interface CategoriesService {
  name: string;
  description: string;
}
@injectable()
class createCategoryUseCase {


  constructor(
    @inject("categoriesRepositories")
    private categoriesRepo: RepositoryInverse){}
  async execute({ name, description }: CategoriesService): Promise<void>{
    
    const verifyCategory = await this.categoriesRepo.findByName(name)
    if(verifyCategory){
      throw new AppError("ja exixte esse nome", 400)
    }
    this.categoriesRepo.Create({ name, description });
  }
}

export { createCategoryUseCase }