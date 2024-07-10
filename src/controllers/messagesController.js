import MessageService from '../services/messagesService.js';

export const getMessages = async (req, res) => {
    try {
        const messages = await MessageService.getMessages();
        res.send({ result: "success", payload: messages });
    } catch (error) {
        console.error('Error al obtener los mensajes:', error);
        res.status(500).send({ status: "error", error: 'Error al obtener los mensajes' });
    }
};

export const createMessage = async (req, res) => {
    const { userId, messageText } = req.body; 

    if (!userId || !messageText) {
        return res.status(400).json({ status: "error", error: "Faltan parámetros" });
    }

    try {
        const newMessage = await MessageService.createMessage(userId, messageText);
        res.status(201).json({ status: "success", payload: newMessage });
    } catch (error) {
        console.error('Error al guardar el mensaje:', error);
        res.status(500).json({ status: "error", error: 'Error al guardar el mensaje' });
    }
};

export default { getMessages, createMessage };
