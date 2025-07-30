import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const BitacoraEventos = sequelize.define('bitacoraEventos', {
  idBitacoraEventos: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  evento: DataTypes.INTEGER,
  timeStamp: DataTypes.DATE,
  idUsuario: DataTypes.INTEGER
}, {
  tableName: 'bitacoraEventos',
  timestamps: false
});