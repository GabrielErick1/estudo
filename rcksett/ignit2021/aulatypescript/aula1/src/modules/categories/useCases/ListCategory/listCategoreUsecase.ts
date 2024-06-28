import { Category } from "../../model/category";
import { RepositoryInverse } from "../../repositories/InverseDependencyRepository";


class ListCategoryUseCase {
  private categoriesRepo: RepositoryInverse;
  constructor(RepositoryInverse: RepositoryInverse){
    this.categoriesRepo = RepositoryInverse;
  }
  execute(): Category[]{
  const visullizar =  this.categoriesRepo.ViweCategory()
    return visullizar
  }
}

export { ListCategoryUseCase }