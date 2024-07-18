const register = (req, res) => {
    res.status(200).json({ message: "Usuario registrado exitosamente" });
};

const failRegister = (req, res) => {
    res.status(400).json({ message: "Registro fallido" });
};

const login = (req, res) => {
    res.status(200).json({ message: "Usuario conectado exitosamente" });
};

const failLogin = (req, res) => {
    res.status(400).json({ message: "Usuario fallido" });
};

const logout = (req, res) => {
    req.logout();
    res.status(200).json({ message: "Usuario desconectado exitosamente" });
};

const github = (req, res) => {
    // registro con github
};

const githubCallback = (req, res) => {
    res.status(200).json({ message: "Autenticacion de GitHub exitosa" });
};

const current = (req, res)=>{
    res.status(200).json({message:"Error de autenticación"})
}

export default {
    register,
    failRegister,
    login,
    failLogin,
    logout,
    github,
    githubCallback,
    current
};
