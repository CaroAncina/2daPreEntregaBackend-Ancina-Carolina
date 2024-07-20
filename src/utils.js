import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendPurchaseEmail = async (to, ticket) => {
    const mailOptions = {
        from: 'acoderhouse@gmail.com',
        to: 'carolinaancina5@gmail.com',
        subject: 'Confirmación de Compra',
        text: `Gracias por tu compra. Aquí están los detalles de tu compra:\n\nCódigo: ${ticket.code}\nFecha: ${ticket.purchase_datetime}\nMonto: ${ticket.amount}\n\nGracias por comprar con nosotros.`,
        html: `<h1>Gracias por tu compra</h1><p>Aquí están los detalles de tu compra:</p><p>Código: ${ticket.code}</p><p>Fecha: ${ticket.purchase_datetime}</p><p>Monto: ${ticket.amount}</p><p>Gracias por comprar con nosotros.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo de confirmación enviado');
    } catch (error) {
        console.error('Error al enviar el correo de confirmación:', error);
        throw error; // Propagar el error para la depuración
    }
};

export default __dirname;
