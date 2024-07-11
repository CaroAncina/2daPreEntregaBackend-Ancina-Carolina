export default class ProductsMemory {
    constructor() {
        this.products = [];
        this.nextId = 1; 
    }

    async get(query, options) {
        return this.products.slice(options.skip, options.skip + options.limit);
    }

    async findById(id) {
        return this.products.find(product => product.id === id);
    }

    async create(product) {
        const newProduct = { ...product, id: this.nextId++ };
        this.products.push(newProduct);
        return newProduct;
    }

    async update(id, updateProduct) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updateProduct };
            return this.products[index];
        }
        return null; 
    }

    async delete(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            const deletedProduct = this.products[index];
            this.products.splice(index, 1);
            return deletedProduct;
        }
        return null;
    }
}
