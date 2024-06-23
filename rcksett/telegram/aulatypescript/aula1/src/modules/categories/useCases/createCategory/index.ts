import { createCategoryUseCase} from "./createCategoryUsecase";
import { categoriesRepositories } from "../../repositories/categories"; 
import {CategoryController} from "./categoryControllers"
const categoriesRepo = new categoriesRepositories();
const category = new createCategoryUseCase(categoriesRepo)
const categoryRoutes  = new CategoryController(category)

export {categoryRoutes }

