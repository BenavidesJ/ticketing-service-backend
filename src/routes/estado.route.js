import express from 'express';
import { obtenerEstados } from '../controllers/estado.js';

const router = express.Router();

router.get('/', obtenerEstados);

export default router;
