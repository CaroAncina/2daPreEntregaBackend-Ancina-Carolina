import { Router } from "express";
import productsModel from '../dao/models/products.model.js';
import messagesModel from "../dao/models/messages.model.js";
import cartsModel from "../dao/models/carts.model.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const products = await productsModel.find().lean();
        res.render("home", { products });
    } catch (error) {
        console.log(error);
    }
})

router.get('/', (req, res) => {
    res.render('home', {});
});

router.get("/products", async (req, res) => {
    let { page = 1, limit = 10, sort, category } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    let query = {};
    if (category) {
        query.category = category;
    }

    let sortOption = {};
    if (sort === 'asc') {
        sortOption.price = 1;
    } else if (sort === 'desc') {
        sortOption.price = -1;
    }

    let options = {
        page,
        limit,
        sort: sortOption,
        lean: true
    };

    let result = await productsModel.paginate(query, options);
    result.prevLink = result.hasPrevPage ? `/products?page=${result.prevPage}&limit=${limit}&sort=${sort || ''}&category=${category || ''}` : '';
    result.nextLink = result.hasNextPage ? `/products?page=${result.nextPage}&limit=${limit}&sort=${sort || ''}&category=${category || ''}` : '';
    result.isValid = !(page <= 0 || page > result.totalPages);

    res.render('products', result);
});

router.get('/realTimeProducts', (req, res) => {
    res.render('realtimeProducts', {});
})

router.get("/carts", async (req, res) => {
    try {
        const carts = await cartsModel.find().lean();
        res.render("carts", { carts });
    } catch (error) {
        console.log(error);
    }
})

router.get('/chat', async (req, res) => {
    try {
        const messages = await messagesModel.find().lean();
        res.render('chat', { messages });
    } catch (error) {
        console.error('Error al obtener los mensajes:', error);
        res.status(500).send('Error al obtener los mensajes');
    }
});

export default router;