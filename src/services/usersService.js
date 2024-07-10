import UserMongoDAO from '../dao/classes/users.dao.js';

class UserService {
    static async createUser(userData) {
        try {
            return await UserMongoDAO.create(userData);
        } catch (error) {
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
