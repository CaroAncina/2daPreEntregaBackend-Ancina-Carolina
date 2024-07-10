// routes/cartsRouter.js
import { Router } from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { getCarts, getCartById, createCart, addProductToCart, updateProductQuantity, clearCart, removeProductFromCart } from '../controllers/cartsController.js';

const router = Router();

router.get('/', isAuthenticated, getCarts);
router.get('/:cid', isAuthenticated, getCartById);
router.post('/', isAuthenticated, createCart);
router.post('/:pid', isAuthenticated, addProductToCart);
router.put('/:cid/products/:pid', isAuthenticated, updateProductQuantity);
router.delete('/:cid', isAuthenticated, clearCart);
router.delete('/:cid/products/:pid', isAuthenticated, removeProductFromCart);

export default router;
