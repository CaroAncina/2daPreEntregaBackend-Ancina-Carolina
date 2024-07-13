import usersService from '../services/usersService.js';
import UserDTO from '../dao/DTOs/users.dto.js';

export const createUser = async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;
    if (!first_name || !last_name || !email || !password || !age) {
        return res.status(400).json({ result: "error", error: "Faltan parámetros obligatorios" });
    }
    try {
        const newUser = await usersService.createUser({ first_name, last_name, email, password, age });
        res.status(201).json({ result: "success", payload: newUser });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ result: "error", error: "Error al crear usuario" });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await usersService.getUsers();
        res.status(200).json({ result: "success", users });
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const getUserById = async (req, res) => {
    const { uid } = req.params;
    try {
        const user = await usersService.getUserById(uid);
        if (!user) {
            return res.status(404).json({ result: "error", error: "Usuario no encontrado" });
        }
        res.status(200).json({ result: "success", payload: user });
    } catch (error) {
        console.error('Error al obtener el usuario por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const updateUser = async (req, res) => {
    const { uid } = req.params;
    const updatedUser = req.body;
    try {
        const result = await usersService.updateUser(uid, updatedUser);
        res.status(200).json({ result: "success", payload: result });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ result: "error", error: "Error al actualizar usuario" });
    }
};

export const deleteUser = async (req, res) => {
    const { uid } = req.params;
    try {
        const result = await usersService.deleteUser(uid);
        res.status(200).json({ result: "success", payload: result });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ result: "error", error: "Error al eliminar usuario" });
    }
};
