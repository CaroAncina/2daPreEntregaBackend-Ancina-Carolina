const express = require('express');
const router = express.Router();
const ProductManager = require('../classes/productManager.js'); 
const productManager = new ProductManager("./Productos.json"); 

// Ruta para listar los productos
router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await productManager.getProducts(); 
        const response = limit ? products.slice(0, limit) : products;
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// Ruta para obtener un producto por ID
router.get('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductsbyId(productId); 
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

// Ruta para agregar un nuevo producto
router.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, category } = req.body;
        await productManager.addProduct({ title, description, price, thumbnail, code, stock, category }); 
        res.status(201).json({ message: 'Producto agregado correctamente' });
    } catch (error) {
        console.error('Error al agregar un nuevo producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para actualizar un producto por su ID
router.put('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedFields = req.body;
        await productManager.updateProduct(productId, updatedFields); 
        res.status(200).json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para eliminar un producto por su ID
router.delete('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        await productManager.deleteProduct(productId); 
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
