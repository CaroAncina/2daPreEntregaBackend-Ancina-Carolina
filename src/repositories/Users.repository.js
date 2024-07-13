import UserDTO from '../dao/DTOs/users.dto.js';

class UsersRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getUsers() {
        let result = await this.dao.getUsers();
        return result.map(user => new UserDTO(user));
    }

    async createUser(user) {
        let userToInsert = new UserDTO(user);
        let result = await this.dao.createUser(userToInsert);
        return new UserDTO(result);
    }

    async getUserById(id) {
        let user = await this.dao.getUserById(id);
        return new UserDTO(user);
    }

    async updateUser(id, updateUser) {
        let userToUpdate = new UserDTO(updateUser);
        let result = await this.dao.updateUser(id, userToUpdate);
        return new UserDTO(result);
    }

    async deleteUser(id) {
        let result = await this.dao.deleteUser(id);
        return result;
    }
}

export default UsersRepository;
