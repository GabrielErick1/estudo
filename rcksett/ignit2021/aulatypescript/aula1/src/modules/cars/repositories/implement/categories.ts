import { Category } from "../../entites/category";
import { CreatCategoryDTO, RepositoryInverse } from "../InverseDependencyRepository";
import {Repository} from "typeorm"
import { AppDataSource } from "../../../../database/data_source";
class categoriesRepositories implements RepositoryInverse {
  private Repository: Repository<Category>


   constructor() {
    this.Repository = AppDataSource.getRepository(Category);
  }




  async findByName(name: string): Promise<Category> { 
    const findCategory = await this.Repository.findOne({ where: { name } });
    return findCategory;
  }
  async Create({ name, description }: CreatCategoryDTO): Promise<void> {
    const newCategory = this.Repository.create({name, description});
    await this.Repository.save(newCategory);
  }

  async ViweCategory(): Promise<Category[]> {
    const CategorisView = await this.Repository.find();
    return CategorisView;
  }
}

export { categoriesRepositories };
