import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Comentarios = sequelize.define('comentarios', {
  idcomentarios: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  comentario: DataTypes.STRING,
  idTicket: DataTypes.INTEGER,
  idAutor: DataTypes.INTEGER,
  fechaCreacion: DataTypes.DATE,
  activo: DataTypes.BOOLEAN
}, {
  tableName: 'comentarios',
  schema: 'sistemaTickets',
  timestamps: false
});