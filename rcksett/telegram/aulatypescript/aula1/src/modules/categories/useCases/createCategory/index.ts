// index.ts
import { CategoryController } from "./categoryControllers";
import { createCategoryUseCase } from "./createCategoryUsecase"; // Importe a classe correta do use case
import { categoriesRepositories } from "../../repositories/categories"; // Importe a classe correta do repositório


const categoriesRepo = new categoriesRepositories();
const createCategoryService = new createCategoryUseCase(categoriesRepo);

export { createCategoryService };
