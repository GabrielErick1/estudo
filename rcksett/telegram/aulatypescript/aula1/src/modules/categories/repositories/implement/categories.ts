import { Category } from "../../model/category";
import { CreatCategoryDTO, RepositoryInverse } from "../InverseDependencyRepository";

class categoriesRepositories implements RepositoryInverse {
  private categories: Category[];
  private static INSTANCE: categoriesRepositories;

  private constructor() {
    this.categories = [];
  }
  findByName(name: string): Category { 
    const findCategory = this.categories.find(category => category.name === name);
      return findCategory;
  }

  public static getInstance(): categoriesRepositories {
    if (!categoriesRepositories.INSTANCE) {
      categoriesRepositories.INSTANCE = new categoriesRepositories();
    }
    return categoriesRepositories.INSTANCE;
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
