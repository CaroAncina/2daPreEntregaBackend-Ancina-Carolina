import cartsModel from '../mongo/models/cartsModel.js';

export default class CartsMongo {
    async getCarts() {
        return await cartsModel.find().populate('products.product').lean();
    }

    async getCartById(id) {
        return await cartsModel.findById(id).populate('products.product').lean();
    }

    async createCart(cart) {
        return await cartsModel.create(cart);
    }

    async addProductToCart(cartId, product) {
        return await cartsModel.findByIdAndUpdate(
            cartId,
            { $push: { products: product } },
            { new: true }
        ).populate('products.product').lean();
    }

    async updateProductQuantity(cartId, productId, quantity) {
        return await cartsModel.findOneAndUpdate(
            { _id: cartId, 'products.productId': productId },
            { $set: { 'products.$.quantity': quantity } },
            { new: true }
        ).populate('products.product').lean();
    }

    async clearCart(cartId) {
        return await cartsModel.findByIdAndUpdate(
            cartId,
            { $set: { products: [] } },
            { new: true }
        ).populate('products.product').lean();
    }

    async removeProductFromCart(cartId, productId) {
        return await cartsModel.findByIdAndUpdate(
            cartId,
            { $pull: { products: { productId: productId } } },
            { new: true }
        ).populate('products.product').lean();
    }
}
