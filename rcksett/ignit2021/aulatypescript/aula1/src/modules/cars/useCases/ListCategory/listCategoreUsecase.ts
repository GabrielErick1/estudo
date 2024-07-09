import { Category } from "../../entites/category";
import { RepositoryInverse } from "../../repositories/InverseDependencyRepository";
import {inject, injectable} from "tsyringe"
@injectable()
class ListCategoryUseCase {

  constructor(
    @inject("categoriesRepositories") 
    private categoriesRepo: RepositoryInverse){}
  async execute(): Promise<Category[]>{
  const visullizar = await this.categoriesRepo.ViweCategory()
    return visullizar
  }
}

export { ListCategoryUseCase }