export default class CartDTO {
    constructor(cart) {
        this.id = cart.id || cart._id;
        this.products = cart.products.map(product => ({
            productId: product.productId,
            quantity: product.quantity
        }));
    }
}
