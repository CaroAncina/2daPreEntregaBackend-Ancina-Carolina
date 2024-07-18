import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        default: () => `ticket_${Date.now()}_${Math.floor(Math.random() * 10000)}`
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
