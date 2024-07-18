import { Router } from 'express';
import { isAuthenticated, isUser } from '../../middleware/auth.js';
import { getMessages, createMessage } from '../../controllers/messagesController.js';

const router = Router();

router.get('/', isAuthenticated, getMessages);
router.post('/', isAuthenticated, isUser, createMessage);

export default router;
