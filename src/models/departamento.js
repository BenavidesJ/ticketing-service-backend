import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Departamento = sequelize.define('departamento', {
  iddepartamento: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  descripcionDepartamento: DataTypes.STRING
}, {
  tableName: 'departamento',
  timestamps: false
});