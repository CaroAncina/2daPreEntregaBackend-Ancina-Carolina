import User from '../models/usersModel.js';

export default class UserMongoDAO {
    static async findAll() {
        return User.find();
    }

    static async findById(id) {
        return User.findById(id);
    }

    static async findByEmail(email) {
        return User.findOne({ email });
    }

    static async create(user) {
        const newUser = new User(user);
        return newUser.save();
    }

    static async update(id, updatedUser) {
        return User.findByIdAndUpdate(id, updatedUser, { new: true });
    }

    static async delete(id) {
        return User.findByIdAndDelete(id);
    }
}
