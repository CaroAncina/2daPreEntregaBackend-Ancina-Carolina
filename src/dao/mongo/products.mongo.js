import productsModel from './models/productsModel.js';

export default class Products {
    constructor() {}

    async getAllProducts(query, options) {
        return await productsModel.paginate(query, options);
    }

    async getProductById(id) {
        return await productsModel.findById(id);
    }

    async createProduct(product) {
        return await productsModel.create(product);
    }

    async updateProduct(id, updateProduct) {
        return await productsModel.findByIdAndUpdate(id, updateProduct, { new: true });
    }

    async deleteProduct(id) {
        return await productsModel.findByIdAndDelete(id);
    }
}
