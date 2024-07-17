import productsModel from '../../dao/models/productsModel.js';
import messagesModel from '../../dao/models/messagesModel.js';

export default (io) => {
    io.on('connection', (socket) => {
        console.log('Usuario conectado');

        // REALTIMEPRODUCTS
        productsModel.find().lean().then((productos) => {
            socket.emit('productos', productos);
        });

        socket.on('nuevoProducto', (producto, user) => {
            if (user && user.role === 'admin') {
                productsModel.create(producto)
                    .then(() => productsModel.find().lean())
                    .then((productos) => {
                        io.emit('productos', productos);
                        socket.emit('respuestaAdd', 'Producto agregado correctamente');
                    })
                    .catch((error) => {
                        socket.emit('respuestaAdd', 'Error al agregar el producto: ' + error.message);
                    });
            } else {
                socket.emit('respuestaAdd', 'No tienes permiso para agregar productos');
            }
        });

        socket.on('eliminarProducto', (pid, user) => {
            if (user && user.role === 'admin') {
                productsModel.findByIdAndDelete(pid)
                    .then(() => productsModel.find().lean())
                    .then((productos) => {
                        io.emit('productos', productos);
                        socket.emit('respuestaDelete', 'Producto eliminado correctamente');
                    })
                    .catch((error) => {
                        socket.emit('respuestaDelete', 'Error al eliminar el producto: ' + error.message);
                    });
            } else {
                socket.emit('respuestaDelete', 'No tienes permiso para eliminar productos');
            }
        });

        // CHAT
        messagesModel.find().then((mensajes) => {
            socket.emit('mensajes', mensajes);
        });

        socket.on('nuevoMensaje', (mensaje) => {
            messagesModel.create(mensaje)
                .then(() => messagesModel.find().lean())
                .then((mensajes) => {
                    io.emit('mensajes', mensajes);
                })
                .catch((error) => {
                    console.error('Error al guardar el mensaje:', error);
                });
        });

        socket.on('disconnect', () => {
            console.log('Usuario desconectado');
        });
    });
};
