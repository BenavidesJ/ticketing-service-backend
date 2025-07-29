import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const TipoTicket = sequelize.define('tipoTicket', {
  idtipoTicket: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  descripcionTipo: DataTypes.STRING
}, {
  tableName: 'tipoTicket',
  schema: 'sistemaTickets',
  timestamps: false
});