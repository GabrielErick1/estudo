import { container} from "tsyringe"
import {RepositoryInverse} from "../../modules/cars/repositories/InverseDependencyRepository"
import { categoriesRepositories} from "../../modules/cars/repositories/implement/categories"

import {inverseDependecyEspecifications} from "../../modules/cars/repositories/inverseDependecyEspecifications"
import { Especifications} from "../../modules/cars/repositories/implement/Especifications"

container.registerSingleton<RepositoryInverse>(
  "categoriesRepositories",
  categoriesRepositories
)

container.registerSingleton<inverseDependecyEspecifications>(
  "Especifications",
  Especifications
)