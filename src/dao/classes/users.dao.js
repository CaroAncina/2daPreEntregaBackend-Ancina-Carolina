import usersModel from '../models/usersModel.js';

const UserMongoDAO = {
    create: async (userData) => {
        try {
            return await usersModel.create(userData);
        } catch (error) {
            console.error("Error creating user in MongoDB: ", error);
            throw error;
        }
    },
    findByEmail: async (email) => {
        try {
            return await usersModel.findOne({ email });
        } catch (error) {
            console.error("Error finding user by email in MongoDB: ", error);
            throw error;
        }
    },
    findAll: async () => {
        try {
            return await usersModel.find();
        } catch (error) {
            console.error("Error finding all users in MongoDB: ", error);
            throw error;
        }
    },
    update: async (uid, updatedUser) => {
        try {
            return await usersModel.findByIdAndUpdate(uid, updatedUser, { new: true });
        } catch (error) {
            console.error("Error updating user in MongoDB: ", error);
            throw error;
        }
    },
    delete: async (uid) => {
        try {
            return await usersModel.findByIdAndDelete(uid);
        } catch (error) {
            console.error("Error deleting user in MongoDB: ", error);
            throw error;
        }
    }
};

export default UserMongoDAO;
