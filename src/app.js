import express from 'express';
import mongoose from './config/database.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import __dirname from './utils.js';
import socketProducts from './public/js/socketProducts.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';

// Importar Rutas
import usersRoutes from './routes/api/usersRouter.js';
import cartsRouter from './routes/api/cartsRouter.js';
import productsRouter from './routes/api/productsRouter.js';
import messagesRouter from './routes/api/messagesRouter.js';
import sessionsRouter from './routes/api/sessionsRouter.js';
import ticketsRouter from './routes/api/ticketsRouter.js'
import viewsRouter from './routes/views/viewsRouter.js';

const app = express();
const PORT = process.env.PORT;

// Middleware para JSON, URL y archivos estáticos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Handlebars 
const hbs = handlebars.create({
    helpers: {
        eq: function (a, b) {
            return a === b;
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Middleware de sesión
app.use(session({
    secret: 'config.sessionSecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB }),
    cookie: { maxAge: 180 * 60 * 1000 },
}));

// Inicializar Passport 
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/api/users', usersRoutes);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/sessions', sessionsRouter);
app.use ('/api/tickets',ticketsRouter);
app.use('/', viewsRouter);

// Inicializar servidor HTTP y configurar Socket.IO
const httpServer = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const io = new Server(httpServer);

socketProducts(io);
