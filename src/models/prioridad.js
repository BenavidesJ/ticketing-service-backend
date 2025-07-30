import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Prioridad = sequelize.define('prioridad', {
  idprioridad: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  descripcionPrioridad: DataTypes.STRING
}, {
  tableName: 'prioridad',
  timestamps: false
});