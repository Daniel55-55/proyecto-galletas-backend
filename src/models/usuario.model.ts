import { pool } from '../config/database';

export interface Usuario {
  id?: number;
  usuario: string;
  contrasena_hash: string;
}

export class UsuarioModel {
  static async crear(usuario: string, contrasenaHash: string): Promise<{ id: number; usuario: string }> {
    const r = await pool.query(
      'INSERT INTO usuarios (usuario, contrasena_hash) VALUES ($1, $2) RETURNING id, usuario',
      [usuario, contrasenaHash]
    );
    return r.rows[0];
  }

  static async obtenerPorUsuario(usuario: string): Promise<Usuario | null> {
    const r = await pool.query('SELECT * FROM usuarios WHERE usuario = $1', [usuario]);
    return r.rows[0] || null;
  }
}
