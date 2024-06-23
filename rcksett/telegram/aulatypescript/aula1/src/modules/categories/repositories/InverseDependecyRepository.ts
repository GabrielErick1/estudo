import {Category} from "../model/category"
interface  CreatCategoryDTO {
  name: string;
  description: string;
}
interface RepositoryInverse {
   findByName(name: string): Category;
   Create({name, description}: CreatCategoryDTO): void
   ViweCategory(): Category[]
}

export { CreatCategoryDTO, RepositoryInverse };