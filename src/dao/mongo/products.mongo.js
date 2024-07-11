import productsModel from './models/productsModel.js';

export default class Products {
    constructor() {}

    async get(query, options) {
        return await productsModel.paginate(query, options);
    }

    async findById(id) {
        return await productsModel.findById(id);
    }

    async create(product) {
        return await productsModel.create(product);
    }

    async update(id, updateProduct) {
        return await productsModel.findByIdAndUpdate(id, updateProduct, { new: true });
    }

    async delete(id) {
        return await productsModel.findByIdAndDelete(id);
    }
}
