import CartDTO from '../dao/DTOs/carts.dto.js';

class CartsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getCarts() {
        const carts = await this.dao.getCarts();
        return carts.map(cart => new CartDTO(cart));
    }

    async getCartById(id) {
        const cart = await this.dao.getCartById(id);
        return new CartDTO(cart);
    }

    async createCart() {
        const newCart = await this.dao.createCart();
        return new CartDTO(newCart);
    }

    async addProductToCart(cartId, product) {
        const updatedCart = await this.dao.addProductToCart(cartId, product);
        return new CartDTO(updatedCart);
    }

    async updateProductQuantity(cartId, productId, quantity) {
        const updatedCart = await this.dao.updateProductQuantity(cartId, productId, quantity);
        return new CartDTO(updatedCart);
    }

    async clearCart(cartId) {
        const updatedCart = await this.dao.clearCart(cartId);
        return new CartDTO(updatedCart);
    }

    async removeProductFromCart(cartId, productId) {
        const updatedCart = await this.dao.removeProductFromCart(cartId, productId);
        return new CartDTO(updatedCart);
    }
}

export default CartsRepository;
