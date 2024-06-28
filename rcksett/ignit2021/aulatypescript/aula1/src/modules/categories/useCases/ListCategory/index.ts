import { ListCategoryUseCase} from "./listCategoreUsecase";
import { categoriesRepositories } from "../../repositories/implement/categories"; 
import {ListCategory} from "./listCategory"
const categoriesRepo = categoriesRepositories.getInstance();
const category = new ListCategoryUseCase(categoriesRepo)
const ListcategoryRoutes  = new ListCategory(category)

export {ListcategoryRoutes }

