import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const TipoUsuario = sequelize.define('tipoUsuario', {
  idTipoUsuario: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  descripcionUsuario: DataTypes.STRING
}, {
  tableName: 'tipoUsuario',
  timestamps: false
});