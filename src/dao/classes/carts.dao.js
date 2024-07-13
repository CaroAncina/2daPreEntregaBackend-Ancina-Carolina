import cartsModel from '../../dao/models/cartsModel.js';

class CartsMongoDAO {
    async findAll() {
        return await cartsModel.find();
    }

    async findById(cartId) {
        return await cartsModel.findById(cartId);
    }

    async create() {
        const newCart = new cartsModel();
        return await newCart.save();
    }

    async updateProductQuantity(cartId, productId, quantity) {
        const cart = await cartsModel.findById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (productIndex === -1) throw new Error('Producto no encontrado en el carrito');

        cart.products[productIndex].quantity = quantity;
        return await cart.save();
    }

    async clearCart(cartId) {
        try {
            const cart = await cartsModel.findByIdAndUpdate(cartId, { products: [] }, { new: true });
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await cartsModel.findById(cartId);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            cart.products = cart.products.filter(p => p.product.toString() !== productId);
            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    }
}

export default new CartsMongoDAO();
