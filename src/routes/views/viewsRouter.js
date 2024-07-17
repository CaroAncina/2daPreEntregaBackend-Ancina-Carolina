import { Router } from 'express';
import viewsController from '../../controllers/viewsController.js';
import { isAuthenticated, isNotAuthenticated, isAdmin, isUser } from '../../middleware/auth.js';

const router = Router();

router.get("/", viewsController.redirectToLogin);
router.get("/products", isAuthenticated, viewsController.getProductsPage);
router.get("/products/:pid", viewsController.getProductDetails);
router.get("/realTimeProducts", isAuthenticated, isAdmin, viewsController.getRealTimeProducts);
router.get("/carts/:cid", isAuthenticated, isUser, viewsController.getCartDetails);
router.get("/chat", isAuthenticated, viewsController.getChatPage);
router.get("/login", isNotAuthenticated, viewsController.getLoginPage);
router.get("/register", isNotAuthenticated, viewsController.getRegisterPage);
router.get("/profile", isAuthenticated, viewsController.getProfilePage);

export default router;

