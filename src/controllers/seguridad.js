import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import { generateJWT } from '../common/generateJWT.js';
import { Usuario } from "../models/index.js"
import { validPasswordRegex } from '../common/strings.js';

dotenv.config();

export const registro = async (req, res) => {
  const { correo, password, nombre, apellido1, apellido2 } = req.body;
  try {
    if (!correo || !password || !nombre || !apellido1 || !apellido2 ) {
      throw new Error('Por favor, complete todos los campos.');
    }

    if (!validPasswordRegex.test(password) && password.length <= 6) {
      throw new Error(
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo (@#!.).'
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Usuario.create({
      correo,
      password: hashedPassword,
      nombre,
      apellido1,
      apellido2,
      activo: 1,
      fechaCreacion: new Date().toISOString(),
      tipoUsuario: 1
    });
    
    const access_token = generateJWT(user.correo);

    return res.status(201).json({
      success: true,
      message: 'Usuario creado correctamente.',
      data: {
        idUsuario: user.idUsuario,
        Nombre: user.nombre,
        Apellido1: user.apellido1,
        Apellido2: user.apellido2,
        Correo: user.correo,
        Access_token: access_token,
        Tipo_Usuario: user.tipoUsuario,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:  error,
      data: null,
    });
  }
};

export const login = async (req, res) => {
  const { correo, password } = req.body;
  try {
    if (!correo || !password) {
      throw new Error('Por favor, complete todos los campos.');
    }

    const user = await Usuario.findOne({
      where: { correo }
    });

    if (!user) {
      throw new Error(
        'Credenciales incorrectas, por favor verifique e ingrese de nuevo sus datos.'
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error(
        'Contraseña incorrecta, por favor verifique e ingrese de nuevo sus datos.'
      );
    }

    const access_token = generateJWT(user);

    return res.status(200).json({
      success: true,
      message: 'Sesión iniciada correctamente.',
      data: {
        idUsuario: user.idUsuario,
        Nombre: user.nombre,
        Apellido1: user.apellido1,
        Apellido2: user.apellido2,
        Correo: user.correo,
        Access_token: access_token,
        Tipo_Usuario: user.tipoUsuario,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:  error,
      data: null,
    });
  }
};

