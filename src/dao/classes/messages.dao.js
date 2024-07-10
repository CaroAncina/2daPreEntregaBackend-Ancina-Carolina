import messagesModel from '../models/messagesModel.js';

class MessagesMongoDAO {
    async findAll() {
        try {
            return await messagesModel.find().populate('user').lean();
        } catch (error) {
            throw error;
        }
    }

    async create(message) {
        try {
            return await messagesModel.create(message); 
        } catch (error) {
            throw error;
        }
    }
}

export default new MessagesMongoDAO();
