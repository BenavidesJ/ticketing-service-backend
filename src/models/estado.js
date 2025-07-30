import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Estado = sequelize.define('estado', {
  idestado: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  descripcionEstado: DataTypes.STRING
}, {
  tableName: 'estado',
  timestamps: false
});