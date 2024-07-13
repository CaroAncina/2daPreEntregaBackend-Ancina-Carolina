import { usersRepository, cartsRepository } from '../repositories/index.js';
import { createHash } from '../utils.js';

class UserService {
    constructor() {
        this.usersRepository = usersRepository;
        this.cartsRepository = cartsRepository;
    }

    async getUsers() {
        return await this.usersRepository.getUsers();
    }

    async createUser(user) {
        const cart = await this.cartsRepository.createCart();
        user.cart = cart.id;
        user.password = createHash(user.password);
        return await this.usersRepository.createUser(user);
    }

    async getUserById(id) {
        return await this.usersRepository.getUserById(id);
    }

    async updateUser(id, updateUser) {
        if (updateUser.password) {
            updateUser.password = createHash(updateUser.password);
        }
        return await this.usersRepository.updateUser(id, updateUser);
    }

    async deleteUser(id) {
        return await this.usersRepository.deleteUser(id);
    }
}

export default new UserService();
