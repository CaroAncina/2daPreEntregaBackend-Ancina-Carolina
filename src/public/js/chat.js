const socket = io();

const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chat-messages');
const userRoleElement = document.getElementById('userRole');
const btnEnviar = document.getElementById('send');

if (userRoleElement) {
    const userRole = userRoleElement.value;

    if (userRole === 'user') {
        if (chatForm) {
            chatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const message = document.getElementById('message').value;

                if (!message.trim()) {
                    alert('Debe ingresar un mensaje');
                    return;
                }

                socket.emit('nuevoMensaje', { messageText: message });

                document.getElementById('message').value = '';
            });
        }
    }
}

socket.on('mensajes', (mensajes) => {
    chatMessages.innerHTML = '';
    mensajes.forEach(({ user, text }) => {
        const messageElement = document.createElement('p');
        messageElement.innerHTML = `<strong>${user.email}</strong>: ${text}`;
        chatMessages.appendChild(messageElement);
    });
});

socket.on('nuevoMensaje', (mensaje) => {
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `<strong>${mensaje.user.email}</strong>: ${mensaje.text}`;
    chatMessages.appendChild(messageElement);
});
