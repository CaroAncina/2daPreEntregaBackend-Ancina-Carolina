import MessagesDAO from '../dao/classes/messages.dao.js';

export default class MessageService {
    static async getMessages() {
        return await MessagesDAO.findAll();
    }

    static async createMessage(userId, userEmail, messageText) {
        try {
            const newMessage = await MessagesDAO.create({ user: userId, userEmail, text: messageText });
            return newMessage;
        } catch (error) {
            console.error('Error al guardar el mensaje:', error);
            throw error;
        }
    }
}
