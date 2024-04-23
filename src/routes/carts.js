const { Console } = require('console');
const express = require('express');
const { get } = require('http');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const { title } = require('process');

const cartsFilePath = path.resolve(__dirname, '../Carts.json');
const productsFilePath = path.resolve(__dirname, '../Productos.json');

let firstId = 0;//para generar id del carrito

// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const newCart = {
            id: newID(),
            products: []
        };

        await save_Cart(newCart);
        res.status(201).json(newCart);
        console.log(newCart)
    } catch (error) {
        console.error('Error al crear un nuevo carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para listar los productos de un carrito específico
router.get('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const cart = await getCartById(cartId);

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

        const cart = await getCartById(cartId);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        const product = await getProductById(productId);
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

        await save_Cart(cart)
        res.status(201).json({ message: 'Producto agregado al carrito correctamente' });
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});



//FUNCIONES AUXILIARES!!
function newID() {
    firstId++;
    return firstId;
}

async function getCartById(id) {
    try {
        const carts = await getCarts();
        const cart = carts.find(cart => cart.id === id);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        return cart;
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        throw error;
    }
}

async function save_Cart(cart) {
    try {
        let carts = await getCarts();
        const index = carts.findIndex(c => c.id === cart.id);
        if (index !== -1) {
            carts[index] = cart;
        } else {
            carts.push(cart);
        }
        await saveCarts(carts);
    } catch (error) {
        console.error('Error al guardar el carrito:', error);
        throw error;
    }
}

async function getCarts() {
    try {
        const data = await fs.readFile(cartsFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo de carritos:', error);
        throw error;
    }
}

async function getProductById(id) {
    try {
        const data = await fs.readFile(productsFilePath, 'utf-8');
        const products = JSON.parse(data);
        const product = products.find(product => product.id === id);
        if (product) {
            return { ...product, title: product.title };
        } else {
            throw new Error('Producto no encontrado');
        }
    } catch (error) {
        console.error('Error al leer el archivo de productos:', error);
        throw error;
    }
}

async function saveCarts(carts) {
    try {
        await fs.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));
    } catch (error) {
        console.error('Error al guardar el archivo de carritos:', error);
        throw error;
    }
}

module.exports = router;
