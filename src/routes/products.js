const express = require('express')
const router = express.Router()
const fs = require('fs').promises
const path = require('path')

const productosFilePath = path.resolve(__dirname, '../Productos.json')

// Ruta para listar los productos
router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await getProducts();
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
        const product = await getproductById(productId);
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

// Ruta para agregar nuevo producto
router.post('/', async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, category } = req.body;

        if (!title || !description || !price || !code || !stock || !category) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios, excepto thumbnail' });
        }

        const products = await getProducts();
        const lastId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const newProduct = {
            id: lastId,
            title,
            description,
            price,
            thumbnail: thumbnail || '',
            code,
            stock,
            status: true,
            category
        };

        products.push(newProduct);
        await saveProducts(products);

        res.status(201).json(newProduct);
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
        await updateProduct(productId, updatedFields);
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
        await deleteProduct(productId);
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});



// FUNCIONES AUXILIARES!!
async function getProducts() {
    try {
        const data = await fs.readFile(productosFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo de productos:', error);
        throw error;
    }
}

async function saveProducts(products) {
    try {
        await fs.writeFile(productosFilePath, JSON.stringify(products, null, 2));
    } catch (error) {
        console.error('Error al guardar el archivo de productos:', error);
        throw error;
    }
}

async function getproductById(id) {
    try {
        const products = await getProducts();
        const product = products.find(p => p.id === id);
        return product;
    } catch (error) {
        console.error('Error al obtener el producto por ID:', error);
        throw error;
    }
}

async function updateProduct(id, updatedFields) {
    try {
        const arrayProducts = await getProducts();
        const index = arrayProducts.findIndex(item => item.id === id);

        if (index !== -1) {
            const updatedProduct = {
                ...arrayProducts[index],
                ...updatedFields
            };
            arrayProducts.splice(index, 1, updatedProduct);
            await saveProducts(arrayProducts);
            console.log('Producto actualizado correctamente');
        } else {
            console.log('No se encontró el producto a actualizar');
        }
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
    }
}

async function deleteProduct(id) {
    try {
        const arrayProducts = await getProducts();
        const updatedProducts = arrayProducts.filter(item => item.id !== id);

        //para que se reemplace el id eliminado y se vuelvan a reasignar
        for (let i = 0; i < updatedProducts.length; i++) {
            if (updatedProducts[i].id > id) {
                updatedProducts[i].id--;
            }
        }

        await saveProducts(updatedProducts);
    } catch (error) {
        console.error("Error al eliminar el producto", error);
    }
}

module.exports = router;
