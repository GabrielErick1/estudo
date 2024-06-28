import { createCategoryUseCase} from "./createCategoryUsecase";
import { categoriesRepositories } from "../../repositories/implement/categories"; 
import {CategoryController} from "./categoryControllers"
const categoriesRepo = categoriesRepositories.getInstance();
const category = new createCategoryUseCase(categoriesRepo)
const categoryRoutes  = new CategoryController(category)

export {categoryRoutes }

