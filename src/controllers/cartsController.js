import CartService from '../services/cartsService.js';
import ProductModel from '../dao/models/productsModel.js';
import ticketsService from '../services/ticketsService.js';
import  {sendPurchaseEmail}  from '../services/mailer.js';

export const getCarts = async (req, res) => {
    try {
        const carts = await CartService.getCarts();
        res.status(200).json({ result: "success", payload: carts });
    } catch (error) {
        console.error("Error al obtener carritos:", error);
        res.status(500).json({ result: "error", error: "Error al obtener carritos" });
    }
};

export const getCartById = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await CartService.getCartById(cartId);

        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        return res.status(200).json(cart);
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const addProductToCart = async (req, res) => {
    try {
        const { pid } = req.params;
        const { user } = req;

        if (!user) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        const cart = await CartService.addProductToCart(user._id, pid);

        return res.status(200).json({ message: 'Producto agregado al carrito con éxito', cart });
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        return res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
};

export const updateProductQuantity = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const updatedCart = await CartService.updateProductQuantity(cid, pid, quantity);
        res.status(200).json({ result: "success", payload: updatedCart });
    } catch (error) {
        console.error("Error al actualizar cantidad del producto:", error);
        res.status(500).json({ result: "error", error: "Error al actualizar cantidad del producto" });
    }
};

export const clearCart = async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await CartService.clearCart(cid);
        res.status(200).json({ result: "success", payload: cart });
    } catch (error) {
        console.error("Error al eliminar todos los productos del carrito:", error);
        res.status(500).json({ result: "error", error: "Error al eliminar todos los productos del carrito" });
    }
};

export const removeProductFromCart = async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const updatedCart = await CartService.removeProductFromCart(cid, pid);
        res.status(200).json({ result: "success", payload: updatedCart });
    } catch (error) {
        console.error("Error al eliminar producto del carrito:", error);
        res.status(500).json({ result: "error", error: "Error al eliminar producto del carrito" });
    }
};

// Endpoint para la compra
export const purchaseCart = async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await CartService.getCartById(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        let totalAmount = 0;
        const productsNotPurchased = [];

        for (const item of cart.products) {
            const product = await ProductModel.findById(item.product);
            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                totalAmount += product.price * item.quantity;
                await product.save();
            } else {
                productsNotPurchased.push(item.product);
            }
        }

        if (totalAmount > 0) {
            const ticket = await ticketsService.createTicket({
                amount: totalAmount,
                purchaser: req.session.user.email,
                products: cart.products.filter(item => !productsNotPurchased.includes(item.product))
            });

            await sendPurchaseEmail(req.session.user.email, ticket);
        }

        cart.products = cart.products.filter(item => productsNotPurchased.includes(item.product));
        await cart.save();

        res.status(200).json({
            message: 'Compra realizada con éxito',
            productsNotPurchased
        });
    } catch (error) {
        console.error('Error al procesar la compra:', error);
        res.status(500).json({ error: 'Error al procesar la compra' });
    }
};