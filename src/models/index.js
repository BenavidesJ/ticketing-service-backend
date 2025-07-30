import { sequelize } from '../config/database.js';

import { Usuario } from './usuario.js';
import { TipoUsuario } from './tipoUsuario.js';
import { Prioridad } from './prioridad.js';
import { Estado } from './estado.js';
import { TipoTicket } from './tipoTicket.js';
import { Departamento } from './departamento.js';
import { Ticket } from './ticket.js';
import { Evento } from './evento.js';
import { BitacoraEventos } from './bitacoraEventos.js';
import { Comentarios } from './comentarios.js';

// Relaciones del modelo Usuario
Usuario.belongsTo(TipoUsuario, { foreignKey: 'tipoUsuario', as: 'rolUsuario' });
TipoUsuario.hasMany(Usuario, { foreignKey: 'tipoUsuario', as: 'usuarios' });

// Relaciones del modelo Ticket
Ticket.belongsTo(Usuario, { foreignKey: 'idSoporte', as: 'soporteAsignado' });
Ticket.belongsTo(Usuario, { foreignKey: 'idCliente', as: 'clienteReporta' });
Ticket.belongsTo(Prioridad, { foreignKey: 'prioridad', as: 'nivelPrioridad' });
Ticket.belongsTo(Estado, { foreignKey: 'estado', as: 'estadoTicket' });
Ticket.belongsTo(TipoTicket, { foreignKey: 'tipoTicket', as: 'categoriaTicket' });
Ticket.belongsTo(Departamento, { foreignKey: 'idDepartamento', as: 'departamentoAsignado' });

// Relaciones de Bitácora de Eventos
BitacoraEventos.belongsTo(Usuario, { foreignKey: 'idUsuario', as: 'usuarioResponsable' });
BitacoraEventos.belongsTo(Evento, { foreignKey: 'evento', as: 'tipoEvento' });

// Relaciones de Comentarios
Comentarios.belongsTo(Usuario, { foreignKey: 'idAutor', as: 'autorComentario' });
Comentarios.belongsTo(Ticket, { foreignKey: 'idTicket', as: 'ticketRelacionado' });

// Exportar modelos y sequelize
export {
  sequelize,
  Usuario,
  TipoUsuario,
  Prioridad,
  Estado,
  TipoTicket,
  Departamento,
  Ticket,
  Evento,
  BitacoraEventos,
  Comentarios
};
