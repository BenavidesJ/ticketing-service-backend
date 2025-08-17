import { Ticket, Estado, Comentarios } from "../models/index.js";

export const crearTiquete = async (req, res) => {
  console.log('Tipo de req.body:', typeof req.body, 'Contenido:', req.body);
  try {
    const { titulo, descripcion, tipoTicket, prioridad, idDepartamento, idCliente, idSoporte } = req.body;

    if (!titulo || !descripcion || !tipoTicket || !prioridad || !idDepartamento || !idCliente || !idSoporte) {
      return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
    }
    const nuevoTiquete = await Ticket.create({
      titulo,
      descripcion,
      tipoTicket,
      prioridad,
      idDepartamento,
      idSoporte,
      estado: 1,
      idCliente,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      activo: true,
    });

    return res.status(201).json({ success: true, data: nuevoTiquete });
  } catch (error) {
    console.error("Error al crear el tiquete:", error);
    return res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

export const actualizarEstadoTiquete = async (req, res) => {
  try {
    const { id } = req.params;
    const { nuevoEstado } = req.body;
    
    const ticket = await Ticket.findByPk(id);
    console.log(id, ticket)
    if (!ticket) return res.status(404).json({ success: false, message: "Tiquete no encontrado" });
    if (ticket.estado === 4) return res.status(400).json({ success: false, message: "El tiquete ya está cerrado." });

    await ticket.update({ estado: nuevoEstado, fechaActualizacion: new Date() });

    return res.status(200).json({ success: true, message: "Estado actualizado correctamente", data: ticket });
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    return res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

export const agregarComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const { comentario, idAutor } = req.body;

    if (!comentario || comentario.trim().length === 0) {
      return res.status(400).json({ success: false, message: "El comentario no puede estar vacío" });
    }

    const ticket = await Ticket.findByPk(id);
    if (!ticket || ![1, 2].includes(ticket.estado)) {
      return res.status(400).json({ success: false, message: "No se puede comentar este tiquete" });
    }

    const nuevoComentario = await Comentarios.create({
      comentario,
      idTicket: id,
      idAutor,
      fechaCreacion: new Date(),
      activo: true,
    });

    await ticket.update({ fechaActualizacion: new Date() });

    return res.status(201).json({ success: true, data: nuevoComentario });
  } catch (error) {
    console.error("Error al agregar comentario:", error);
    return res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

export const obtenerTiquetesAgrupadosPorEstado = async (_req, res) => {
  try {

    const estados = await Estado.findAll();


    const agrupado = {};
    estados.forEach(e => {
      agrupado[e.descripcionEstado] = [];
    });


    const tickets = await Ticket.findAll({
      include: [
        { association: 'estadoTicket' },
        { association: 'clienteReporta' },
        { association: 'soporteAsignado' },
        { association: 'nivelPrioridad' },
        { association: 'categoriaTicket' },
        { association: 'departamentoAsignado' }
      ],
      order: [['fechaCreacion', 'DESC']]
    });


    tickets.forEach(ticket => {
      const estadoNombre = ticket.estadoTicket?.descripcionEstado || 'Desconocido';
      if (!agrupado[estadoNombre]) {
        agrupado[estadoNombre] = []; 
      }
      agrupado[estadoNombre].push(ticket);
    });

    return res.status(200).json({ success: true, data: agrupado });
  } catch (error) {
    console.error('Error al obtener tickets agrupados:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

// Obtener todos los comentarios de un tiquete
export const obtenerComentariosDeTiquete = async (req, res) => {
  const { id } = req.params;

  try {
    const ticketId = Number(id);
    if (!Number.isInteger(ticketId) || ticketId <= 0) {
      return res.status(400).json({ success: false, message: "Parámetro 'id' inválido" });
    }

    // Verificar que el ticket exista
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Tiquete no encontrado" });
    }

    // Traer comentarios activos del ticket con info básica del autor
    const comentarios = await Comentarios.findAll({
      where: { idTicket: ticketId, activo: true },
      attributes: ['idcomentarios', 'comentario', 'idAutor', 'fechaCreacion', 'activo'],
      include: [
        {
          association: 'autorComentario',
          attributes: ['idusuario', 'nombre', 'apellido1', 'apellido2', 'correo'],
        },
      ],
      order: [['fechaCreacion', 'ASC']],
    });

    return res.status(200).json({ success: true, data: comentarios });
  } catch (error) {
    console.error("Error al obtener comentarios del tiquete:", error);
    return res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};
