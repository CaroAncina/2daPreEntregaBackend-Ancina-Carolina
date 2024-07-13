import mongoose from 'mongoose';
import config from '../config/database.js';

export let Users;
export let Products;
export let Carts;

export async function initializePersistence() {
    switch (config.persistence) {
        case "MONGO":
            const connection = await mongoose.connect(config.mongoURI);
            const { default: UsersMongo } = await import('./mongo/users.mongo.js');
            const { default: ProductsMongo } = await import('./mongo/products.mongo.js');
            const { default: CartsMongo } = await import('./mongo/carts.mongo.js');
            Users = UsersMongo;
            Products = ProductsMongo;
            Carts = CartsMongo;
            break;
        case "MEMORY":
            const { default: UsersMemory } = await import('./memory/users.memory.js');
            const { default: ProductsMemory } = await import('./memory/products.memory.js');
            const { default: CartsMemory } = await import('./memory/carts.memory.js');
            Users = UsersMemory;
            Products = ProductsMemory;
            Carts = CartsMemory;
            break;
        default:
            throw new Error("Método de persistencia no soportado");
    }
}
