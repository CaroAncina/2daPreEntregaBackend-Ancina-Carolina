import userService from '../dao/models/usersModel.js';
import CartsMongoDAO from '../dao/classes/carts.dao.js';

class CartService {
    async getCarts() {
        return await CartsMongoDAO.findAll();
    }

    async getCartById(cartId) {
        return await CartsMongoDAO.findById(cartId);
    }

    async createCart() {
        return await CartsMongoDAO.create();
    }

    async addProductToCart(userId, productId) {
        try {
            const user = await userService.findById(userId).populate('cart').lean();
            if (!user || !user.cart) {
                throw new Error('Carrito no encontrado');
            }

            const cart = await CartsMongoDAO.findById(user.cart._id);
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }
            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            throw error;
        }
    }

    async updateProductQuantity(cartId, productId, quantity) {
        return await CartsMongoDAO.updateProductQuantity(cartId, productId, quantity);
    }

    async clearCart(cartId) {
        return await CartsMongoDAO.clearCart(cartId);
    }

    async removeProductFromCart(cartId, productId) {
        return await CartsMongoDAO.removeProductFromCart(cartId, productId);
    }
}

export default new CartService();
