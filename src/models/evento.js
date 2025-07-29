import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Evento = sequelize.define('evento', {
  idevento: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  descripcionEvento: DataTypes.STRING
}, {
  tableName: 'evento',
  schema: 'sistemaTickets',
  timestamps: false
});