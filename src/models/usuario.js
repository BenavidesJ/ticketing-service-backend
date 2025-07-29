import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Usuario = sequelize.define('usuario', {
  idusuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: DataTypes.STRING,
  apellido1: DataTypes.STRING,
  apellido2: DataTypes.STRING,
  correo: DataTypes.STRING,
  password: DataTypes.STRING,
  activo: DataTypes.BOOLEAN,
  fechaCreacion: DataTypes.DATE,
  tipoUsuario: DataTypes.INTEGER
}, {
  tableName: 'usuario',
  schema: 'sistemaTickets',
  timestamps: false
});
