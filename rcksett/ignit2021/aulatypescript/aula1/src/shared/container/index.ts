

import { container} from "tsyringe"

// aqui meus cars

import {RepositoryInverse} from "../../modules/cars/repositories/InverseDependencyRepository"
import { categoriesRepositories} from "../../modules/cars/repositories/implement/categories"
import {inverseDependecyEspecifications} from "../../modules/cars/repositories/inverseDependecyEspecifications"
import { Especifications} from "../../modules/cars/repositories/implement/Especifications"

//  aqui meus accounts
import {Account} from "../../modules/accounts/repositories/implements/AccontUsers"
import {InterfaceAccount} from "../../modules/accounts/repositories/IusersInterface"

//cars
container.registerSingleton<RepositoryInverse>(
  "categoriesRepositories",
  categoriesRepositories
)

container.registerSingleton<inverseDependecyEspecifications>(
  "Especifications",
  Especifications
)

// accounts

container.registerSingleton<InterfaceAccount>(
  "Accounts",
  Account
)