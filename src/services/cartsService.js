import { cartsRepository } from '../repositories/index.js';

class CartService {
    constructor() {
        this.repository = cartsRepository;
    }

    async getCarts() {
        return await this.repository.getCarts();
    }

    async getCartById(id) {
        return await this.repository.getCartById(id);
    }

    async createCart() {
        return await this.repository.createCart();
    }

    async addProductToCart(cartId, product) {
        return await this.repository.addProductToCart(cartId, product);
    }

    async updateProductQuantity(cartId, productId, quantity) {
        return await this.repository.updateProductQuantity(cartId, productId, quantity);
    }

    async clearCart(cartId) {
        return await this.repository.clearCart(cartId);
    }

    async removeProductFromCart(cartId, productId) {
        return await this.repository.removeProductFromCart(cartId, productId);
    }
}

export default new CartService();
