import ProductDTO from "../dao/DTOs/products.dto.js";

export default class ProductsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getAllProducts(query, options) {
        let result = await this.dao.get(query, options);
        return result.docs.map(product => new ProductDTO(product));
    }

    async getProductById(id) {
        let product = await this.dao.findById(id);
        return new ProductDTO(product);
    }

    async createProduct(product) {
        let productToInsert = new ProductDTO(product);
        let result = await this.dao.create(productToInsert);
        return new ProductDTO(result);
    }

    async updateProduct(id, updateProduct) {
        let productToUpdate = new ProductDTO(updateProduct);
        let result = await this.dao.update(id, productToUpdate);
        return new ProductDTO(result);
    }

    async deleteProduct(id) {
        let result = await this.dao.delete(id);
        return result;
    }
}
