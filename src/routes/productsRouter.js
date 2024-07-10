import { Router } from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productsController.js';

const router = Router();

router.get("/", getAllProducts);
router.get('/:pid', getProductById);
router.post('/', createProduct);
router.put('/:uid', updateProduct);
router.delete('/:uid', deleteProduct);

export default router;
