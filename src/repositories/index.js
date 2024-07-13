import UsersRepository from './Users.repository.js';
import ProductsRepository from './Products.repository.js';
import CartsRepository from './Carts.repository.js';
import { Users, Products, Carts } from '../dao/factory.js';


export const usersRepository = new UsersRepository(Users);
export const productsRepository = new ProductsRepository(Products);
export const cartsRepository = new CartsRepository(Carts);
