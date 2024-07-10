import productsModel from '../dao/models/productsModel.js';

export default class ProductService {
    static async getAllProducts(query, options) {
        return productsModel.paginate(query, options);
    }

    static async getProductById(id) {
        return productsModel.findById(id).lean();
    }

    static async createProduct(productData) {
        return productsModel.create(productData);
    }

    static async updateProduct(id, productData) {
        return productsModel.updateOne({ _id: id }, productData);
    }

    static async deleteProduct(id) {
        return productsModel.deleteOne({ _id: id });
    }
}
