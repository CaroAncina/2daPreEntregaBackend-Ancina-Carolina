import { Router } from "express";
import cartsModel from '../dao/models/carts.model.js';

const router = Router();

//Obtiene todos los carritos
router.get('/', async (req, res) => {
    try {
        const carts = await cartsModel.find().populate('products.product').lean();
        res.status(200).json({ result: "success", payload: carts });
    } catch (error) {
        console.error("Error al obtener carritos:", error);
        res.status(500).json({ result: "error", error: "Error al obtener carritos" });
    }
});

//Crea un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const newCart = await cartsModel.create({});
        res.status(201).json({ result: "success", payload: newCart });
    } catch (error) {
        console.error("Error al crear carrito:", error);
        res.status(500).json({ result: "error", error: "Error al crear carrito" });
    }
});

//Actualiza un carrito especifico con un array de productos
router.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    try {
        const updatedCart = await cartsModel.findByIdAndUpdate(cid, { products }, { new: true }).populate('products.product').lean();
        res.status(200).json({ result: "success", payload: updatedCart });
    } catch (error) {
        console.error("Error al actualizar carrito:", error);
        res.status(500).json({ result: "error", error: "Error al actualizar carrito" });
    }
});

//Actualiza la cantidad de un producto especifico de un carrito
router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await cartsModel.findById(cid);
        const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
        if (productIndex > -1) {
            cart.products[productIndex].quantity = quantity;
            await cart.save();
        } else {
            cart.products.push({ product: pid, quantity });
            await cart.save();
        }
        const updatedCart = await cart.populate('products.product');
        res.status(200).json({ result: "success", payload: updatedCart });
    } catch (error) {
        console.error("Error al actualizar cantidad del producto:", error);
        res.status(500).json({ result: "error", error: "Error al actualizar cantidad del producto" });
    }
});

//Elimina los productos del carrito
router.delete('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartsModel.findById(cid);
        cart.products = [];
        await cart.save();
        res.status(200).json({ result: "success", payload: cart });
    } catch (error) {
        console.error("Error al eliminar todos los productos del carrito:", error);
        res.status(500).json({ result: "error", error: "Error al eliminar todos los productos del carrito" });
    }
});

//Elimina un producto especifico de un carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await cartsModel.findById(cid);
        cart.products = cart.products.filter(p => p.product.toString() !== pid);
        await cart.save();
        const updatedCart = await cart.populate('products.product');
        res.status(200).json({ result: "success", payload: updatedCart });
    } catch (error) {
        console.error("Error al eliminar producto del carrito:", error);
        res.status(500).json({ result: "error", error: "Error al eliminar producto del carrito" });
    }
});

export default router;
