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

// Relaciones
Usuario.belongsTo(TipoUsuario, { foreignKey: 'tipoUsuario' });
TipoUsuario.hasOne(Usuario, { foreignKey: 'tipoUsuario' });

Ticket.belongsTo(Usuario, { as: 'Soporte', foreignKey: 'idSoporte' });
Ticket.belongsTo(Usuario, { as: 'Cliente', foreignKey: 'idCliente' });
Ticket.belongsTo(Prioridad, { foreignKey: 'prioridad' });
Ticket.belongsTo(Estado, { foreignKey: 'estado' });
Ticket.belongsTo(TipoTicket, { foreignKey: 'tipoTicket' });
Ticket.belongsTo(Departamento, { foreignKey: 'idDepartamento' });

BitacoraEventos.belongsTo(Usuario, { foreignKey: 'idUsuario' });
BitacoraEventos.belongsTo(Evento, { foreignKey: 'evento' });

Comentarios.belongsTo(Usuario, { foreignKey: 'idAutor' });
Comentarios.belongsTo(Ticket, { foreignKey: 'idTicket' });

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
