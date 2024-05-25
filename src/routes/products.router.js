import { Router } from "express";
import productsModel from '../dao/models/products.model.js';

const router = Router();

router.get("/", async (req, res) => {
    try {
        let query = {};

        // Filtro por categoría
        if (req.query.category) {
            query.category = req.query.category;
        }

        // Ordenamiento por precio
        let sort = {};
        if (req.query.sort === 'asc') {
            sort.price = 1;
        } else if (req.query.sort === 'desc') {
            sort.price = -1;
        }

        const limit = parseInt(req.query.limit) || 5;
        const page = parseInt(req.query.page) || 1;

        const options = {
            limit,
            page,
            sort
        };

        const products = await productsModel.paginate(query, options);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error interno" });
    }
});

router.post('/', async (req, res) => {
    const { title, description, price, code, stock, category } = req.body;
    if (!title || !description || !price || !code || !stock || !category) {
        return res.status(400).json({ result: "error", error: "Faltan parámetros obligatorios" });
    }
    try {
        const newProduct = await productsModel.create({ title, description, price, code, stock, category });
        res.status(201).json({ result: "success", payload: newProduct });
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ result: "error", error: "Error al crear producto" });
    }
});

router.put('/:uid', async (req, res) => {
    const { uid } = req.params;
    const updatedProduct = req.body;
    try {
        const result = await productsModel.updateOne({ _id: uid }, updatedProduct);
        res.status(200).json({ result: "success", payload: result });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ result: "error", error: "Error al actualizar producto" });
    }
});

router.delete('/:uid', async (req, res) => {
    const { uid } = req.params;
    try {
        const result = await productsModel.deleteOne({ _id: uid });
        res.status(200).json({ result: "success", payload: result });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ result: "error", error: "Error al eliminar producto" });
    }
});

export default router;
