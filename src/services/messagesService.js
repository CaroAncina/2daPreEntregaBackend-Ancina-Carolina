import MessagesMongoDAO from '../dao/classes/messages.dao.js';
import userService from '../dao/models/usersModel.js';

export default class MessageService {
    static async getMessages() {
        return await MessagesMongoDAO.findAll();
    }

    static async createMessage(userId, messageText) {
        try {
            const user = await userService.getUserById(userId);
            if (!user) {
                throw new Error(`Usuario con ID ${userId} no encontrado`);
            }

            const newMessage = await MessagesMongoDAO.create({ user: userId, text: messageText });
            return newMessage;
        } catch (error) {
            console.error('Error al guardar el mensaje:', error);
            throw error;
        }
    }
}
