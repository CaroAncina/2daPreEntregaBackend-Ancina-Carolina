import { Router } from "express";
import viewsController from '../controllers/viewsController.js';
import { isAuthenticated, isNotAuthenticated } from '../middleware/auth.js';

const router = Router();

router.get("/", viewsController.redirectToLogin);
router.get("/products", isAuthenticated, viewsController.getProductsPage);
router.get("/products/:pid", viewsController.getProductDetails);
router.get("/realTimeProducts", viewsController.getRealTimeProducts);
router.get("/carts/:cid", viewsController.getCartDetails);
router.get("/chat", viewsController.getChatPage);
router.get("/login", isNotAuthenticated, viewsController.getLoginPage);
router.get("/register", isNotAuthenticated, viewsController.getRegisterPage);
router.get("/profile", isAuthenticated, viewsController.getProfilePage);

export default router;
