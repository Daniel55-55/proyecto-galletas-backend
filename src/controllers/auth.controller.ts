import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { UsuarioModel } from '../models/usuario.model';

export const registrar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usuario = String(req.body?.usuario ?? '').trim();
    const contrasena = String(req.body?.contrasena ?? '');

    if (usuario.length < 4) {
      res.status(400).json({ message: 'El usuario debe tener mínimo 4 caracteres' });
      return;
    }
    if (usuario.length > 50) {
      res.status(400).json({ message: 'El usuario debe tener máximo 50 caracteres' });
      return;
    }
    if (usuario.includes(' ')) {
      res.status(400).json({ message: 'El usuario no puede tener espacios' });
      return;
    }
    if (contrasena.length < 6) {
      res.status(400).json({ message: 'La contraseña debe tener mínimo 6 caracteres' });
      return;
    }
    if (!/[a-zA-Z]/.test(contrasena) || !/[0-9]/.test(contrasena)) {
      res.status(400).json({ message: 'La contraseña debe tener al menos una letra y un número' });
      return;
    }

    const existente = await UsuarioModel.obtenerPorUsuario(usuario);
    if (existente) {
      res.status(409).json({ message: 'El usuario ya existe' });
      return;
    }

    const hash = await bcrypt.hash(contrasena, 10);
    const nuevo = await UsuarioModel.crear(usuario, hash);
    res.status(201).json({ message: 'Usuario registrado', usuario: nuevo.usuario });
  } catch (error) {
    if ((error as any).code === '23505') {
      res.status(409).json({ message: 'El usuario ya existe' });
      return;
    }
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usuario = String(req.body?.usuario ?? '').trim();
    const contrasena = String(req.body?.contrasena ?? '');

    const encontrado = await UsuarioModel.obtenerPorUsuario(usuario);
    if (!encontrado || !(await bcrypt.compare(contrasena, encontrado.contrasena_hash))) {
      res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
      return;
    }

    res.json({ message: 'Ingreso exitoso', usuario: encontrado.usuario });
  } catch (error) {
    next(error);
  }
};
