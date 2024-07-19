import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'caroancinacabj@gmail.com', 
        pass: 'ttdq gkps qljp viln' 
    }
});

export const sendPurchaseEmail = async (to, ticket) => {
    const mailOptions = {
        from: 'acoderhousej@gmail.com',
        to: to,
        subject: 'Confirmación de Compra',
        text: `Gracias por tu compra. Aquí están los detalles de tu compra:\n\nCódigo: ${ticket.code}\nFecha: ${ticket.purchase_datetime}\nMonto: ${ticket.amount}\n\nGracias por comprar con nosotros.`,
        html: `<h1>Gracias por tu compra</h1><p>Aquí están los detalles de tu compra:</p><p>Código: ${ticket.code}</p><p>Fecha: ${ticket.purchase_datetime}</p><p>Monto: ${ticket.amount}</p><p>Gracias por comprar con nosotros.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo de confirmación enviado');
    } catch (error) {
        console.error('Error al enviar el correo de confirmación:', error);
    }
};
