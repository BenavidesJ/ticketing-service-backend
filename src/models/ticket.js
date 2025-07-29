import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Ticket = sequelize.define('ticket', {
  idTicket: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  titulo: DataTypes.STRING,
  descripcion: DataTypes.STRING,
  fechaCreacion: DataTypes.DATE,
  fechaActualizacion: DataTypes.DATE,
  tipoTicket: DataTypes.INTEGER,
  idSoporte: DataTypes.INTEGER,
  idCliente: DataTypes.INTEGER,
  prioridad: DataTypes.INTEGER,
  estado: DataTypes.INTEGER,
  activo: DataTypes.BOOLEAN,
  idDepartamento: DataTypes.INTEGER
}, {
  tableName: 'ticket',
  schema: 'sistemaTickets',
  timestamps: false
});