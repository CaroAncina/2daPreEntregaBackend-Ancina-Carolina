const express = require('express');
const router = express.Router();
const path = require('path'); 
const CartManager = require('../classes/cartManager');
const cartManager = new CartManager('./Carts.json');
const ProductManager = require('../classes/productManager.js'); 
const productManager = new ProductManager("./Productos.json"); 
const productsFilePath = path.resolve(__dirname, '../Productos.json');

// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createNewCart();
        res.status(201).json(newCart);
    } catch (error) {
        console.error('Error al crear un nuevo carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para obtener un carrito por ID
router.get('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const cart = await cartManager.getCartById(cartId);

        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado." });
        }

        res.json(cart.products);
    } catch (error) {
        console.error("Error al obtener los productos del carrito:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
});

// Ruta para agregar un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const { quantity } = req.body;

        const cart = await cartManager.getCartById(cartId);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        const product = await cartManager.getProductById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        let productIndex = cart.products.findIndex(p => p.product === productId);
        if (productIndex !== -1) {
            // Si el producto ya existe en el carrito, incrementa la cantidad
            cart.products[productIndex].quantity += parseInt(quantity);
        } else {
            // Si el producto no existe en el carrito, lo agrega
            cart.products.push({ product: productId, title: product.title, quantity: parseInt(quantity) });
        }

        await cartManager.saveCart(cart);
        res.status(201).json({ message: 'Producto agregado al carrito correctamente' });
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router; 
