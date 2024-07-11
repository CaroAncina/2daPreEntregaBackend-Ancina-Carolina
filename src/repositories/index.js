import { Users,Products } from "../dao/factory.js"

import UsersRepository from "./Users.repository.js";
import ProductsRepository from "./Products.repository.js";

export const usersService = new UsersRepository(new Users)
export const productsService = new ProductsRepository (new Products)