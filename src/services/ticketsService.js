import Ticket from '../dao/models/ticketsModel.js';
import { v4 as uuidv4 } from 'uuid';

class TicketService {
    async getAllTickets() {
        return await Ticket.find().lean();
    }

    async getTicketById(ticketId) {
        return await Ticket.findById(ticketId).lean();
    }

    async createTicket({ amount, purchaser, products }) {
        const newTicket = new Ticket({
            code: uuidv4(), // Generar un código único para el ticket
            purchase_datetime: new Date(),
            amount,
            purchaser,
            products
        });
        return await newTicket.save();
    }

    async updateTicket(ticketId, updateData) {
        return await Ticket.findByIdAndUpdate(ticketId, updateData, { new: true }).lean();
    }

    async deleteTicket(ticketId) {
        return await Ticket.findByIdAndDelete(ticketId).lean();
    }
}

export default new TicketService();
