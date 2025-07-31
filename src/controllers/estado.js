import { Estado } from '../models/index.js';

export const obtenerEstados = async (_req, res) => {
  try {
    const estados = await Estado.findAll({
      attributes: ['idestado', 'descripcionEstado'],
      order: [['idestado', 'ASC']],
    });

    return res.status(200).json({
      success: true,
      data: estados,
    });
  } catch (error) {
    console.error('Error al obtener estados:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    });
  }
};
