export default class CartsMemory {
    constructor() {
        this.carts = [];
    }

    async getCarts() {
        return this.carts;
    }

    async getCartById(id) {
        return this.carts.find(cart => cart.id === id);
    }

    async createCart() {
        const newCart = { id: `${this.carts.length + 1}`, products: [] };
        this.carts.push(newCart);
        return newCart;
    }

    async addProductToCart(cartId, product) {
        const cart = this.getCartById(cartId);
        if (cart) {
            const existingProduct = cart.products.find(p => p.productId === product.productId);
            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            } else {
                cart.products.push(product);
            }
            return cart;
        }
        return null;
    }

    async updateProductQuantity(cartId, productId, quantity) {
        const cart = this.getCartById(cartId);
        if (cart) {
            const product = cart.products.find(p => p.productId === productId);
            if (product) {
                product.quantity = quantity;
                return cart;
            }
        }
        return null;
    }

    async clearCart(cartId) {
        const cart = this.getCartById(cartId);
        if (cart) {
            cart.products = [];
            return cart;
        }
        return null;
    }

    async removeProductFromCart(cartId, productId) {
        const cart = this.getCartById(cartId);
        if (cart) {
            cart.products = cart.products.filter(p => p.productId !== productId);
            return cart;
        }
        return null;
    }
}
