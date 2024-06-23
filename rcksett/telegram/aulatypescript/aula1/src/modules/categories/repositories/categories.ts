import { Category } from "../model/category";
import { CreatCategoryDTO, RepositoryInverse } from "./InverseDependecyRepository";

class categoriesRepositories implements RepositoryInverse {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  findByName(name: string): Category { 
    const findCategory = this.categories.find(category => category.name === name);
    if (findCategory) {
       return findCategory;
    }
  }

  Create({ name, description }: CreatCategoryDTO): void {
    const newCategory: Category = new Category();
    Object.assign(newCategory, {
      name,
      description
    });

    this.categories.push(newCategory);
    console.log(this.categories);
  }

  ViweCategory(): Category[] {
    console.log(this.categories);
    
    return this.categories;
  }
}

export { categoriesRepositories };