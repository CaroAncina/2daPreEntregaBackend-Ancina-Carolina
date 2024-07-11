import UserDTO from "../dao/DTOs/users.dto.js";

export default class UsersRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getUsers() {
        let result = await this.dao.get();
        return result.map(user => new UserDTO(user));
    }

    async createUser(user) {
        let userToInsert = new UserDTO(user);
        let result = await this.dao.create(userToInsert);
        return new UserDTO(result);
    }

    async getUserById(id) {
        let user = await this.dao.findById(id);
        return new UserDTO(user);
    }

    async updateUser(id, updateUser) {
        let userToUpdate = new UserDTO(updateUser);
        let result = await this.dao.update(id, userToUpdate);
        return new UserDTO(result);
    }

    async deleteUser(id) {
        let result = await this.dao.delete(id);
        return result;
    }
}
