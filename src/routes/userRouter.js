import express from 'express';
import { createUser, getUserByEmail, getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:email', getUserByEmail);
router.put('/:uid', updateUser);
router.delete('/:uid', deleteUser);

export default router;
