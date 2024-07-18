import productsModel from '../../dao/models/productsModel.js';
import messagesModel from '../../dao/models/messagesModel.js';

export default (io) => {
    io.on('connection', (socket) => {
        console.log('Usuario conectado');

        // Enviar productos al conectarse
        productsModel.find().lean().then((productos) => {
            socket.emit('productos', productos);
        });

        // Escuchar evento para agregar producto
        socket.on('nuevoProducto', (producto) => {
            productsModel.create(producto)
                .then(() => productsModel.find().lean())
                .then((productos) => {
                    io.emit('productos', productos);
                    socket.emit('respuestaAdd', 'Producto agregado correctamente');
                })
                .catch((error) => {
                    socket.emit('respuestaAdd', 'Error al agregar el producto: ' + error.message);
                });
        });

        // Escuchar evento para actualizar producto
        socket.on('actualizarProducto', (producto) => {
            const { id, ...updateData } = producto;
            productsModel.findByIdAndUpdate(id, updateData, { new: true })
                .then(() => productsModel.find().lean())
                .then((productos) => {
                    io.emit('productos', productos);
                    socket.emit('respuestaUpdate', 'Producto actualizado correctamente');
                })
                .catch((error) => {
                    socket.emit('respuestaUpdate', 'Error al actualizar el producto: ' + error.message);
                });
        });

        // Escuchar evento para obtener producto
        socket.on('obtenerProducto', (id) => {
            productsModel.findById(id).lean()
                .then((producto) => {
                    socket.emit('productoObtenido', producto);
                })
                .catch((error) => {
                    console.error('Error al obtener el producto:', error);
                });
        });

        // Escuchar evento para eliminar producto
        socket.on('eliminarProducto', (pid) => {
            productsModel.findByIdAndDelete(pid)
                .then(() => productsModel.find().lean())
                .then((productos) => {
                    io.emit('productos', productos);
                    socket.emit('respuestaDelete', 'Producto eliminado correctamente');
                })
                .catch((error) => {
                    socket.emit('respuestaDelete', 'Error al eliminar el producto: ' + error.message);
                });
        });

         //CHAT
         messagesModel.find().populate('user').lean().then((mensajes) => {
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

