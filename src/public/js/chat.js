const socket = io();

const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chat-messages');
const userField = document.getElementById('user');
const messageField = document.getElementById('message');

// Cuando se envía el formulario de chat
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = userField.value.trim(); 
    const message = messageField.value.trim(); 

    if (user === '' || message === '') {
        alert('Por favor ingresa tu correo y escribe un mensaje');
        return;
    }

    socket.emit('nuevoMensaje', { user, message });

    messageField.value = '';
});

// Recibir mensajes del servidor
socket.on('mensajes', (mensajes) => {
    chatMessages.innerHTML = ''; 
    mensajes.forEach(({ user, text }) => {
        const messageElement = document.createElement('p');
        messageElement.innerHTML = `<strong>${user}</strong>: ${text}`;
        chatMessages.appendChild(messageElement);
    });
});

socket.on('nuevoMensaje', (mensaje) => {
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `<strong>${mensaje.user}</strong>: ${mensaje.text}`;
    chatMessages.appendChild(messageElement);
});
