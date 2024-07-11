import mongoose from "mongoose";
import config from '../config/database.js'

console.log(config)

export let Users
export let Products
switch (config.persistence) {
    case "MONGO":
        const connection = mongoose.connect("mongodb+srv://CaroAncina:Carocabj55@cluster0.e1buc2r.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
        const { default: UsersMongo } = await import('./mongo/users.mongo.js')
        const { default: ProductsMongo } = await import('./mongo/products.mongo.js')
        Users = UsersMongo
        Products = ProductsMongo
        break;
    case "MEMORY":
        const { default: UsersMemory } = await import("./memory/users.memory.js")
        const { default: ProductsMemory } = await import("./memory/products.memory.js")
        Users = UsersMemory
        Products = ProductsMemory
        break

    default:

}