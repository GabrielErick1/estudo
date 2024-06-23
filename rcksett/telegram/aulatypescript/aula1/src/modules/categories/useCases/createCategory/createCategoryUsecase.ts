import { RepositoryInverse } from "../../repositories/InverseDependecyRepository";


interface CategoriesService {
  name: string;
  description: string;
}

class createCategoryUseCase {
  private categoriesRepo: RepositoryInverse;

  constructor(RepositoryInverse: RepositoryInverse){
    this.categoriesRepo = RepositoryInverse;
  }
  execute({ name, description }: CategoriesService): void{
    console.log("ola", name, description);
    
    const verifyCategory = this.categoriesRepo.findByName(name)
    if(verifyCategory){
      throw new Error("ja exixte esse nome")
    }
    this.categoriesRepo.Create({ name, description });
  }
}

export { createCategoryUseCase }