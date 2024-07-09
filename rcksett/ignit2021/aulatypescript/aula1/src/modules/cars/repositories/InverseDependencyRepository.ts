import {Category} from "../entites/category"
interface  CreatCategoryDTO {
  name: string;
  description: string;
}
interface RepositoryInverse {
   findByName(name: string): Promise<Category> ;
   Create({name, description}: CreatCategoryDTO): Promise<void>;
   ViweCategory(): Promise<Category[]>;
}

export { CreatCategoryDTO, RepositoryInverse };