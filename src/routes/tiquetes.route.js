import express from 'express';
import {
  crearTiquete,
  actualizarEstadoTiquete,
  agregarComentario,
  obtenerTiquetesAgrupadosPorEstado,
} from '../controllers/tiquetes.js';

const router = express.Router();

// Crear un nuevo tiquete (por cliente)
router.post('/', crearTiquete);

// Actualizar el estado del tiquete (por técnico de soporte)
router.patch('/:id/estado', actualizarEstadoTiquete);

// Agregar un comentario a un tiquete (cliente o técnico)
router.post('/:id/comentario', agregarComentario);

router.get('/', obtenerTiquetesAgrupadosPorEstado);

export default router;
