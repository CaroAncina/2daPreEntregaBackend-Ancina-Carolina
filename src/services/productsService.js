import { Products } from '../dao/factory.js';
import ProductsRepository from '../repositories/Products.repository.js';

class ProductService {
    constructor() {
        this.repository = new ProductsRepository(Products);
    }

    async getAllProducts(query, options) {
        return await this.repository.getAllProducts(query, options);
    }

    async getProductById(id) {
        return await this.repository.getProductById(id);
    }

    async createProduct(product) {
        return await this.repository.createProduct(product);
    }

    async updateProduct(id, updateProduct) {
        return await this.repository.updateProduct(id, updateProduct);
    }

    async deleteProduct(id) {
        return await this.repository.deleteProduct(id);
    }
}

export default new ProductService();
