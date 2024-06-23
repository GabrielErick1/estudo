import { ListCategoryUseCase} from "./listCategoreUsecase";
import { categoriesRepositories } from "../../repositories/categories"; 
import {ListCategory} from "./listCategory"
const categoriesRepo = new categoriesRepositories();
const category = new ListCategoryUseCase(categoriesRepo)
const ListcategoryRoutes  = new ListCategory(category)

export {ListcategoryRoutes }

