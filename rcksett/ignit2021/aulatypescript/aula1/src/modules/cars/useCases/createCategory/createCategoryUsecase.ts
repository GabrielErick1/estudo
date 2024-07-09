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
      throw new Error("ja exixte esse nome")
    }
    this.categoriesRepo.Create({ name, description });
  }
}

export { createCategoryUseCase }