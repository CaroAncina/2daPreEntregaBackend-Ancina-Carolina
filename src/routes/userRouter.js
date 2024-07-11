import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:uid', getUserById);
router.put('/users/:uid', updateUser);
router.delete('/users/:uid', deleteUser);

export default router;
