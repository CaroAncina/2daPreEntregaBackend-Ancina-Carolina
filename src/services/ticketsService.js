import Ticket from '../dao/models/ticketsModel.js';

class TicketService {
    async createTicket(amount, purchaser) {
        try {
            const newTicket = new Ticket({
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
