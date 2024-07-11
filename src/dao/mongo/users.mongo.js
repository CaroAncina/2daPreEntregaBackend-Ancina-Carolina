import usersModel from './models/usersModel.js';

export default class UsersMongo {
    async get() {
        let users = await usersModel.find();
        return users;
    }

    async create(user) {
        let newUser = await usersModel.create(user);
        return newUser;
    }

    async findById(id) {
        let user = await usersModel.findById(id);
        return user;
    }

    async update(id, updateUser) {
        let updatedUser = await usersModel.findByIdAndUpdate(id, updateUser, { new: true });
        return updatedUser;
    }

    async delete(id) {
        let deletedUser = await usersModel.findByIdAndDelete(id);
        return deletedUser;
    }
}
