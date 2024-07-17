import UserMongoDAO from '../dao/classes/users.dao.js';
import CartMongoDAO from '../dao/classes/carts.dao.js';
import { createHash } from '../utils.js';

class UserService {
    static async createUser(userData) {
        try {
            const existingUser = await UserMongoDAO.findByEmail(userData.email);
            if (existingUser) {
                throw new Error('El correo electrónico ya está en uso');
            }
            userData.password = createHash(userData.password);

            if (userData.email === 'adminCoder@coder.com') {
                userData.role = 'admin';
            } else {
                userData.role = 'user';
                const newCart = await CartMongoDAO.create({ products: [] });
                userData.cart = newCart._id;
            }

            const result = await UserMongoDAO.create(userData);
            return result;
        } catch (error) {
            console.error("Error details:", error);
            throw new Error('Error al crear usuario');
        }
    }

    static async getUserByEmail(email) {
        try {
            return await UserMongoDAO.findByEmail(email);
        } catch (error) {
            throw new Error('Error al obtener usuario por email');
        }
    }

    static async getAllUsers() {
        try {
            return await UserMongoDAO.findAll();
        } catch (error) {
            throw new Error('Error al obtener todos los usuarios');
        }
    }

    static async updateUser(uid, updatedUser) {
        try {
            if (updatedUser.password) {
                updatedUser.password = createHash(updatedUser.password);
            }
            return await UserMongoDAO.update(uid, updatedUser);
        } catch (error) {
            throw new Error('Error al actualizar usuario');
        }
    }

    static async deleteUser(uid) {
        try {
            return await UserMongoDAO.delete(uid);
        } catch (error) {
            throw new Error('Error al eliminar usuario');
        }
    }
}

export default UserService;
