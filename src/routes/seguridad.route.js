import express from 'express';
import { login, registro } from "../controllers/seguridad.js"

const router = express.Router();
// Inicio de Sesión
router.post('/login', login);
// Registro de Usuario
router.post('/registro', registro);

export default router;