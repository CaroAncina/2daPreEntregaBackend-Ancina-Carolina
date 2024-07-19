import Ticket from '../dao/models/ticketsModel.js';
import { v4 as uuidv4 } from 'uuid';

class TicketService {
    async createTicket(amount, purchaser) {
        try {
            const newTicket = new Ticket({
                code: uuidv4(),
                purchase_datetime: new Date(),
                amount,
                purchaser
            });
            return await newTicket.save();
        } catch (error) {
            console.error('Error al crear el ticket:', error);
            throw error;
        }
    }
}

export default new TicketService();
