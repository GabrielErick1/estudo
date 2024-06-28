import {fileCategory}  from "./fileCategory";
import {FileCategoryUseCase} from "./CategoryUsecaase"
import {categoriesRepositories}  from "../../repositories/implement/categories"
const ReposiCategoris = categoriesRepositories.getInstance();
const fileCategoryUseCase = new FileCategoryUseCase(ReposiCategoris);
const fileCategoryHandle = new fileCategory(fileCategoryUseCase)

export {fileCategoryHandle}