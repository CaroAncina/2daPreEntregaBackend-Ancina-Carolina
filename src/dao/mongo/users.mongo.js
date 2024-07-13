import usersModel from '../mongo/models/usersModel.js';

export default class UsersMongo {
    async getUsers() {
        return await usersModel.find();
    }

    async createUser(user) {
        return await usersModel.create(user);

    }

    async getUserById(id) {
        return await usersModel.findById(id);
    }

    async updateUser(id, updateUser) {
        return await usersModel.findByIdAndUpdate(id, updateUser, { new: true });
    }

    async deleteUser(id) {
        return await usersModel.findByIdAndDelete(id);

    }
}
