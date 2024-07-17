class SessionsController {
    async register(req, res) {
        res.redirect('/login');
    }

    async failRegister(req, res) {
        res.status(400).send({ error: "Falló el registro" });
    }

    async login(req, res) {
        if (!req.user) return res.status(400).send({ status: "error", error: "Datos incompletos" });
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            cart: req.user.cart,
            role: req.user.role
        };
        res.redirect('/products');
    }

    async failLogin(req, res) {
        res.status(400).send({ error: "Login fallido" });
    }

    async logout(req, res) {
        req.session.destroy(err => {
            if (err) return res.status(500).send('Error al cerrar sesión');
            res.redirect('/login');
        });
    }

    async github(req, res) {
        // Redirige a GitHub para autenticación
    }

    async githubCallback(req, res) {
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            cart: req.user.cart,
            role: req.user.role
        };
        res.redirect('/products');
    }
}

export default new SessionsController();
