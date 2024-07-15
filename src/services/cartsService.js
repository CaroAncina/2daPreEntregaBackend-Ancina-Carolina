import UsersMongoDAO from '../dao/models/usersModel.js';
import CartsMongoDAO from '../dao/models/cartsModel.js';

class CartService {
    async getCarts() {
        return await CartsMongoDAO.find();
    }

    async getCartById(cartId) {
        return await CartsMongoDAO.findById(cartId);
    }

    async addProductToCart(userId, productId) {
        try {
            const user = await UsersMongoDAO.findById(userId).populate('cart').lean();
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
        try {
            const cart = await CartsMongoDAO.findById(cartId);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
            if (productIndex === -1) {
                throw new Error('Producto no encontrado en el carrito');
            }

            cart.products[productIndex].quantity = quantity;
            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error al actualizar cantidad del producto:', error);
            throw error;
        }
    }

    async clearCart(cartId) {
        try {
            const cart = await CartsMongoDAO.findById(cartId);
            cart.products = [];
            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error al eliminar todos los productos del carrito:', error);
            throw error;
        }
    }

    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await CartsMongoDAO.findById(cartId);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
            if (productIndex === -1) {
                throw new Error('Producto no encontrado en el carrito');
            }

            cart.products.splice(productIndex, 1);
            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error al eliminar producto del carrito:', error);
            throw error;
        }
    }
}

export default new CartService();
