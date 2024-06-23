import { CategoryController } from "./categoryControllers";
import { categoriesRepositories } from "../../repositories/categories";

const Categories = new categoriesRepositories();
const categoryCreate = new CategoryController(Categories);

export { categoryCreate };
