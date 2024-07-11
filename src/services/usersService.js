import { Users } from '../dao/factory.js';
import UsersRepository from '../repositories/Users.repository.js';

class UserService {
    constructor() {
        this.repository = new UsersRepository(Users);
    }

    async getUsers() {
        return await this.repository.getUsers();
    }

    async createUser(user) {
        return await this.repository.createUser(user);
    }

    async getUserById(id) {
        return await this.repository.getUserById(id);
    }

    async updateUser(id, updateUser) {
        return await this.repository.updateUser(id, updateUser);
    }

    async deleteUser(id) {
        return await this.repository.deleteUser(id);
    }
}

export default new UserService();
